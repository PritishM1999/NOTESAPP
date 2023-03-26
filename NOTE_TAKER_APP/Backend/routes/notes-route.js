// const express = require('express');
// const authMiddleware = require('../middleware/authMiddleware');
// const Note = require('../models/Note');

// const router = express.Router();

// // get all notes
// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const notes = await Note.find({ user: req.userId });
//     res.json(notes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // create a new note
// router.post('/', authMiddleware, async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const note = new Note({
//       title,
//       content,
//       user: req.userId,
//     });
//     await note.save();
//     res.status(201).json({ message: 'Note created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // update a note
// router.put('/:id', authMiddleware, async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const note = await Note.findOneAndUpdate(
//       { _id: req.params.id, user: req.userId },
//       { title, content },
//       { new: true }
//     );
//     if (!note) {
//       return res.status(404).json({ error: 'Note not found' });
//     }
//     res.json(note);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // delete a note
// router.delete('/:id', authMiddleware, async (req, res) => {
//   try {
//     const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
//     if (!note) {
//       return res.status(404).json({ error: 'Note not found' });
//     }
//     res.json({ message: 'Note deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
