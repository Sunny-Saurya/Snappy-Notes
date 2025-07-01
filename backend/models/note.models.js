const mongoose = require("mongoose")
const {Schema} = mongoose 

const noteSchema = new Schema({
    title: 
    {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags:{
        type: [String],
        default: []
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    },
    createdon: {
        type: Date,
        default: new Date().getTime()
    }

});

module.exports = mongoose.model("Note", noteSchema);  //exporting the model