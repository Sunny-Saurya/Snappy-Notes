require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Failed:', err));

const User = require("./models/user.models")
const Note = require("./models/note.models")
const bcrypt = require("bcryptjs"); 
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

const jwt = require("jsonwebtoken");
const { authenticateToken } = require('./utilities')


app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.json({ data: "Hello from server" });
})

// create Account
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// Signup route
app.post("/createAccount", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({ error: true, message: "Please enter your full name" });
    }
    if (!email) {
        return res.status(400).json({ error: true, message: "Please enter your email" });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "Please enter your password" });
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.status(400).json({ error: true, message: "Email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        fullName,
        email,
        password: hashedPassword,
    });

    await user.save();

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10h",
    });

    return res.json({
        error: false,
        message: "Registration Successful",
        accessToken,
    });
});

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: true, message: "Please enter your email" });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "Please enter your password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ error: true, message: "Email not found" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ error: true, message: "Invalid email or password" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10h",
    });

    return res.json({
        error: false,
        message: "Login Successful",
        accessToken,
    });
});

// get user

app.get("/get-user", authenticateToken, async (req, res) => {
    try {
        console.log("req.user:", req.user); 
        const user = req.user;
        const isUser = await User.findOne({ _id: user._id });

        if (!isUser) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        return res.json({
            user: {fullName: isUser.fullName, email: isUser.email, password: isUser.password},
            error: false,
            message: "User found",
        });
    } catch (err) {
        return res.status(500).json({ error: true, message: "Server error" });
    }
});


// adding notes

app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if (!title) {
        return res.status(400).json({ error: true, message: "Please enter your title" });
    }
    if (!content) {
        return res.status(400).json({ error: true, message: "Please enter your content" });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        console.log("Saving note:", note);
        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully",
        });
    } catch (err) {
        console.error("Error saving note:", err);
        return res.status(400).json({ error: true, message: "Error adding note" });
    }
});


// update note

app.post("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const { noteId } = req.params;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res.status(400).json({
            error: true,
            message: "Please enter your title, content, or tags"
        });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found"
            });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned !== undefined) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: "Error updating note"
        });
    }
});

// Get all notes
app.get("/get-all-notes/", authenticateToken, async (req, res) => {
    const { user } = req.user;
    try {
        const notes = await Note.find({ userId: user._id }).sort({
            isPinned: -1
        });
        return res.json({
            error: false,
            notes,
            message: "Notes retrieved successfully",
        });

    }
    catch (err) {
        return res.status(400).json({
            error: true,
            message: "Error retrieving notes"
        });
    }
})

// Delete a note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const { noteId } = req.params; // Extract noteId from URL parameters
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found"
            });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({
            error: false,
            message: "Note deleted successfully",
        });
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: "Error deleting note"
        });
    }
});


// upate isPinned value

app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {

    const { noteId } = req.params;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found"
            });
        }

        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: "Error updating note"
        });
    }

})


// search note


app.get("/search-notes/", authenticateToken, async (req, res) => {
    const { user } = req.user;
    const { query } = req.body;

    if(!query){
        return res.status(400).json({
            error: true,
            message: "Please provide a query"
            });
    }
    try{
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                {
                    title: { $regex: new RegExp(query, 'i') },
                    content: { $regex: new RegExp(query, 'i') },
                }
            ]
        });
        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes found"

        });
    }
    catch(error){
        return res.status(400).json({
            error: true,
            message: "Error searching notes"
            });
    }
});

app.listen(8000);
module.exports = app;