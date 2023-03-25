const express = require('express')
const router  = express.Router();
const Note = require('../models/notes-schema');

router.get('/note', async (req, res) => {
    try{
        const notes = await Note.find();
        res.json(notes);
    } catch (err){
        res.json({message: err})
    }
});


router.get('/:noteId', async (req, res) => {
    try{
        const note = await Note.findById(req.params.noteId);
        res.json(note);
    }
    catch (err){
        res.json({message: err})
    }
})

router.post('/addNote', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
        date: new Date()
    });

    try{
        const saveNote = await note.save();
        res.json(saveNote);
    }
    catch(err){
        res.json({message: err});
    }
});


router.patch('/updatenotes/:noteId', async (req, res) => {
    try{
        const updatedNote = await Note.updateOne(
            { _id: req.params.noteId},
            { $set: {title: req.body.title, content: req.body.content}}
        );
        res.json(updatedNote);
    } catch(err){
        res.json({ message: err });
    }
});

router.delete('/deletenote/:noteId', async (req, res) => {
    try{
        const removeNote = await Note.deleteOne({ _id: req.params.noteId });
        res.json(removeNote);
    } catch(err){
        res.json({ message: err })
    }
});

router.delete('/deleteAllnotes/', async (req, res) => {
    try{
        const removedNotes = await Note.deleteMany();
        res.json(removedNotes);
    } 
    catch(err){
        res.json({ message: err })
    }
});

module.exports = router;