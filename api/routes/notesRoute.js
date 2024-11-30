const express = require("express");
const verifyUser = require("../utils/verifyUser.js");
const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController.js");

const router = express.Router();
router.get("/", verifyUser, getNotes);
router.get("/:noteId", verifyUser, getNote);
router.post("/", verifyUser, createNote);
router.patch("/:noteId", verifyUser, updateNote);
router.delete("/:noteId", verifyUser, deleteNote);

module.exports = router;
