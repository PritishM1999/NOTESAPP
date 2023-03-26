// const express = require('express');
// const authMiddleware = require('../middleware/authmiddleware');
// const Note = require('../models/notes-schema');

// const router = express.Router();

// // Get all notes
// router.get('/all', authMiddleware, async (req, res) => {
//   console.log("getall");
//   try {
//     const notes = await Note.find({ user: req.user._id });
//     res.json(notes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Create a new note
// router.post('/note', authMiddleware, async (req, res) => {
//   console.log("postnote");
//   try {
//     const { title, content } = req.body;
//     const newNote = new Note({
//       title,
//       content,
//       user: req.user._id,
//     });
//     await newNote.save();
//     res.status(201).json({ message: 'Note created successfully', note: newNote });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get a specific note by ID
// router.get('/:id', authMiddleware, async (req, res) => {
//   try {
//     const note = await Note.findById(req.params.id);
//     if (!note || note.user.toString() !== req.user._id.toString()) {
//       return res.status(404).json({ error: 'Note not found' });
//     }
//     res.json(note);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update a specific note by ID
// router.patch('/:id', authMiddleware, async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const note = await Note.findById(req.params.id);
//     if (!note || note.user.toString() !== req.user._id.toString()) {
//       return res.status(404).json({ error: 'Note not found' });
//     }
//     note.title = title || note.title;
//     note.content = content || note.content;
//     await note.save();
//     res.json({ message: 'Note updated successfully', note });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Delete a specific note by ID
// router.delete('/:id', authMiddleware, async (req, res) => {
//   try {
//     const note = await Note.findById(req.params.id);
//     if (!note || note.user.toString() !== req.user._id.toString()) {
//       return res.status(404).json({ error: 'Note not found' });
//     }
//     await note.remove();
//     res.json({ message: 'Note deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
