const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creatorId: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Low",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
