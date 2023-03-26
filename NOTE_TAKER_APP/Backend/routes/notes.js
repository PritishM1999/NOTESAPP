// const express = require("express");
// const router = express.Router();
// const {
//   getAllNotes,
//   getNoteById,
//   createNote,
//   updateNoteById,
//   deleteNoteById,
//   deleteAllNotes
// } = require("../controllers/notes");

// // Get all notes
// router.get("/notes", (req, res) => {
//   getAllNotes()
//     .then(notes => res.status(200).json(notes))
//     .catch(err => res.status(500).json({ error: err.message }));
// });

// // Get a single note by ID
// router.get("/notes/:id", (req, res) => {
//   getNoteById(req.params.id)
//     .then(note => res.status(200).json(note))
//     .catch(err => res.status(404).json({ error: err.message }));
// });

// // Add a new note
// router.post("/note", (req, res) => {
//   createNote(req.body)
//     .then(note => res.status(201).json(note))
//     .catch(err => res.status(400).json({ error: err.message }));
// });

// // Update a note by ID
// router.put("/notes/:id", (req, res) => {
//   updateNoteById(req.params.id, req.body)
//     .then(note => res.status(200).json(note))
//     .catch(err => res.status(404).json({ error: err.message }));
// });

// // Delete a note by ID
// router.delete("/notes/:id", (req, res) => {
//   deleteNoteById(req.params.id)
//     .then(() => res.status(200).json({ message: "Note deleted successfully" }))
//     .catch(err => res.status(404).json({ error: err.message }));
// });

// // Delete all notes
// router.delete("/notes", (req, res) => {
//   deleteAllNotes()
//     .then(() => res.status(200).json({ message: "All notes deleted successfully" }))
//     .catch(err => res.status(500).json({ error: err.message }));
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNoteById,
  deleteNoteById,
  deleteAllNotes
} = require("../controllers/notes");

// Get all notes
router.get("/notes", getAllNotes);

// Get a single note by ID
router.get("/notes/:id", getNoteById);

// Add a new note
router.post("/note", createNote);

// Update a note by ID
router.put("/notes/:id", updateNoteById);

// Delete a note by ID
router.delete("/notes/:id", deleteNoteById);

// Delete all notes
router.delete("/notes", deleteAllNotes);

module.exports = router;
