const Note = require("../models/notesModel.js");
const errorHandler = require("../utils/errorHandler.js");

exports.createNote = async function (req, res, next) {
  const { title, description, priority, dueDate } = req.body;
  const creatorId = req.userId.id;
  if (!title || !description || !dueDate) {
    return next(
      errorHandler("Title and description and due date are required field", 404)
    );
  }
  const newNote = new Note({
    title,
    description,
    creatorId,
    priority,
    dueDate,
    createdAt: Date.now(),
  });
  try {
    await newNote.save();
    res.status(201).json({
      status: "success",
      note: newNote,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getNotes = async function (req, res, next) {
  const creatorId = req.userId.id;
  try {
    const notes = await Note.find({ creatorId });
    const total = await Note.countDocuments({ creatorId });
    res.status(200).json({
      status: "success",
      notes,
      total,
    });
  } catch (error) {
    next(error);
  }
};

exports.getNote = async function (req, res, next) {
  const { noteId } = req.params;
  const creatorId = req.userId.id;
  try {
    const note = await Note.findOne({ _id: noteId, creatorId });
    if (!note) {
      return next(errorHandler("No note found", 404));
    }
    res.status(200).json({
      status: "success",
      note,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateNote = async function (req, res, next) {
  const { noteId } = req.params;
  const creatorId = req.userId.id;
  try {
    const note = await Note.findOne({ _id: noteId, creatorId });
    if (!note) {
      return next(errorHandler("No note found", 404));
    }
    const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      status: "success",
      updatedNote,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteNote = async function (req, res, next) {
  const { noteId } = req.params;
  const creatorId = req.userId.id;
  try {
    const note = await Note.findOne({ _id: noteId, creatorId });
    if (!note) {
      return next(errorHandler("No note found", 404));
    }
    await Note.findByIdAndDelete(noteId);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
