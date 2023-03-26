// const express = require('express')
// const router  = express.Router();
// const Note = require('../models/notes');

// // Get all notes
// // router.get('/notes', async (req, res) => {
// //     try{
// //         const notes = await Note.find();
// //         res.json(notes);
// //     } catch (err){
// //         res.json({message: err})
// //     }
// // });
// // Get all notes
// router.get('/notes', async (req, res) => {
//     try {
//       const notes = await Note.find();
//       res.header('Content-Type', 'application/json');
//       res.json(notes);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  

// // Get a single note by ID
// router.get('/notes/:id', async (req, res) => {
//     try{
//         const note = await Note.findById(req.params.id);
//         res.header('Content-Type', 'application/json');
//         res.json(note);
//     }
//     catch (err){
//         res.json({message: err})
//     }
// })

// // Add a new note
// router.post('/note', async (req, res) => {
//     const note = new Note({
//         title: req.body.title,
//         content: req.body.content,
//         // date: new Date()
//     });

//     try{
//         res.header('Content-Type', 'application/json');
//         const saveNote = await note.save();
//         res.json(saveNote);
//     }
//     catch(err){
//         res.json({message: err});
//     }
// });

// // Update a note by ID
// router.put('/notes/:id', async (req, res) => {
//     try{
//         res.header('Content-Type', 'application/json');
//         const updatedNote = await Note.updateOne(
//             { _id: req.params.id},
//             { $set: {title: req.body.title, content: req.body.content}}
//         );
//         res.json(updatedNote);
//     } catch(err){
//         res.json({ message: err });
//     }
// });

// // Delete a note by ID
// router.delete('/notes/:id', async (req, res) => {
//     try{
//         res.header('Content-Type', 'application/json');
//         const removeNote = await Note.deleteOne({ _id: req.params.id });
//         res.json(removeNote);
//     } catch(err){
//         res.json({ message: err })
//     }
// });

// // Delete all notes
// router.delete('/notes', async (req, res) => {
//     try{
//         res.header('Content-Type', 'application/json');
//         const removedNotes = await Note.deleteMany();
//         res.json(removedNotes);
//     } 
//     catch(err){
//         res.json({ message: err })
//     }
// });

// module.exports = router;


// // router.get('/notes', async (req, res) => {
// //     try{
// //         const notes = await Note.find();
// //         res.json(notes);
// //     } catch (err){
// //         res.json({message: err})
// //     }
// // });


// // router.get('/showall/:noteId', async (req, res) => {
// //     try{
// //         const note = await Note.findById(req.params.noteId);
// //         res.json(note);
// //     }
// //     catch (err){
// //         res.json({message: err})
// //     }
// // })

// // router.post('/addNote', async (req, res) => {
// //     const note = new Note({
// //         title: req.body.title,
// //         content: req.body.content,
// //         date: new Date()
// //     });

// //     try{
// //         const saveNote = await note.save();
// //         res.json(saveNote);
// //     }
// //     catch(err){
// //         res.json({message: err});
// //     }
// // });


// // router.patch('/updatenotes/:noteId', async (req, res) => {
// //     try{
// //         const updatedNote = await Note.updateOne(
// //             { _id: req.params.noteId},
// //             { $set: {title: req.body.title, content: req.body.content}}
// //         );
// //         res.json(updatedNote);
// //     } catch(err){
// //         res.json({ message: err });
// //     }
// // });

// // router.delete('/deletenote/:noteId', async (req, res) => {
// //     try{
// //         const removeNote = await Note.deleteOne({ _id: req.params.noteId });
// //         res.json(removeNote);
// //     } catch(err){
// //         res.json({ message: err })
// //     }
// // });

// // router.delete('/deleteAllnotes/', async (req, res) => {
// //     try{
// //         const removedNotes = await Note.deleteMany();
// //         res.json(removedNotes);
// //     } 
// //     catch(err){
// //         res.json({ message: err })
// //     }
// // });

// // module.exports = router;