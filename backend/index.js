const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.set("trust proxy", 1); // required for cross-origin cookies on Render

require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/user.models");
const Note = require("./models/note.models");
const { authenticateToken } = require('./utilities');

const app = express();
const port = process.env.PORT || 4000;

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Failed:', err));

// Middleware
app.use(express.json());
app.use(cors({
  // origin: "http://localhost:5173",
  origin: "https://snappy-notes.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Root route
app.get("/", (req, res) => {
  res.json({ data: "Hello from server" });
});


// ✅ Signup
app.post("/createAccount", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: true, message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ fullName, email, password: hashedPassword });
  await user.save();

  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10h" });

  return res.json({ error: false, message: "Registration successful", accessToken });
});


// ✅ Login
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: true, message: "Email and password are required" });
//   }

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).json({ error: true, message: "Email not found" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ error: true, message: "Invalid email or password" });
//   }

//   const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10h" });

//   return res.json({ error: false, message: "Login successful", accessToken });
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: true, message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: true, message: "Email not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: true, message: "Invalid email or password" });
  }

  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10h" });

  // ✅ Set HTTP-only cookie
  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None", // Required for cross-origin cookies (e.g., Vercel + localhost)
    maxAge: 10 * 60 * 60 * 1000, // 10 hours
  });

  return res.json({ error: false, message: "Login successful" });
});


// ✅ Get current user
app.get("/get-user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: true, message: "User not found" });

    return res.json({
      error: false,
      message: "User found",
      user: { fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: "Server error" });
  }
});


// ✅ Add Note
app.post("/add-note", authenticateToken, async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newNote = new Note({
      title,
      content,
      tags: tags || [],
      userId: req.user.userId,
    });

    await newNote.save();
    return res.status(201).json({ note: newNote });
  } catch (error) {
    console.error("Error in /add-note:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


// ✅ Edit Note
app.post("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;

  try {
    const note = await Note.findOne({ _id: noteId, userId: req.user.userId });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;

    await note.save();
    return res.json({ error: false, note, message: "Note updated successfully" });
  } catch (err) {
    return res.status(400).json({ error: true, message: "Error updating note" });
  }
});


// ✅ Get All Notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId }).sort({ isPinned: -1 });
    return res.json({ error: false, notes, message: "Notes retrieved successfully" });
  } catch (err) {
    return res.status(500).json({ error: true, message: "Server error" });
  }
});


// ✅ Delete Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;

  try {
    const note = await Note.findOne({ _id: noteId, userId: req.user.userId });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    await Note.deleteOne({ _id: noteId });
    return res.json({ error: false, message: "Note deleted successfully" });
  } catch (err) {
    return res.status(400).json({ error: true, message: "Error deleting note" });
  }
});


// ✅ Toggle Pin
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { isPinned } = req.body;

  try {
    const note = await Note.findOne({ _id: noteId, userId: req.user.userId });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    note.isPinned = isPinned;
    await note.save();

    return res.json({ error: false, note, message: "Note pin updated" });
  } catch (err) {
    return res.status(400).json({ error: true, message: "Error updating pin status" });
  }
});


// ✅ Search Notes
app.get("/search-notes", authenticateToken, async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: true, message: "Please provide a search query" });
  }

  try {
    const results = await Note.find({
      userId: req.user.userId,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });

    return res.json({ error: false, notes: results, message: "Search completed" });
  } catch (err) {
    return res.status(400).json({ error: true, message: "Error searching notes" });
  }
});


// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
