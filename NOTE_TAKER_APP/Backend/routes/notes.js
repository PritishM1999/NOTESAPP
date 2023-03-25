const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes');
const authMiddleware = require('../middleware/authmiddleware');

// Get all notes
router.get('/', authMiddleware.verifyToken, notesController.getAllNotes);

// Get a note by ID
router.get('/:id', authMiddleware.verifyToken, notesController.getNoteById);

// Create a note
router.post('/', authMiddleware.verifyToken, notesController.createNote);

// Update a note by ID
router.put('/:id', authMiddleware.verifyToken, notesController.updateNoteById);

// Delete a note by ID
router.delete('/:id', authMiddleware.verifyToken, notesController.deleteNoteById);

// Delete all notes
router.delete('/', authMiddleware.verifyToken, notesController.deleteAllNotes);

module.exports = router;
