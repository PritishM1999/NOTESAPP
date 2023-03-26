// const Joi = require('joi');

// const noteSchema = Joi.object({
//   title: Joi.string().required(),
//   content: Joi.string().required(),
// });

// exports.createNote = async (req, res) => {
//   const { error } = noteSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ msg: error.details[0].message });
//   }

//   const { title, content } = req.body;
//   const date = new Date();

//   try {
//     const newNote = new Note({
//       title,
//       content,
//       date,
//       user: req.user.id,
//     });

//     const note = await newNote.save();
//     res.status(201).json(note);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// };

// exports.updateNoteById = async (req, res) => {
//   const { error } = noteSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ msg: error.details[0].message });
//   }

//   const { title, content } = req.body;

//   const noteFields = {};
//   if (title) noteFields.title = title;
//   if (content) noteFields.content = content;

//   try {
//     let note = await Note.findById(req.params.id);
//     if (!note) {
//       return res.status(404).json({ msg: "Note not found" });
//     }

//     // Make sure user owns the note
//     if (note.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: "Not authorized" });
//     }

//     note = await Note.findByIdAndUpdate(
//       req.params.id,
//       { $set: noteFields },
//       { new: true }
//     );

//     res.status(200).json(note);
//   } catch (error) {
//     console.error(error.message);
//     if (error.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Note not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// };


const Note = require("../models/notes");

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Note not found" });
    }
    res.status(500).send("Server Error");
  }
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const date = new Date();

  try {
    // if (!req.user || !req.user.id || !req.user.token) {
    //   return res.status(401).json({ msg: "Not authorized" });
    // }

    const newNote = new Note({
      title,
      content,
      date,
      user: req.user.id,
    });

    const note = await newNote.save();
    res.status(201).json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Server Error" });
  }
};


exports.updateNoteById = async (req, res) => {
  const { title, content } = req.body;

  const noteFields = {};
  if (title) noteFields.title = title;
  if (content) noteFields.content = content;

  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    // Make sure user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: noteFields },
      { new: true }
    );

    res.status(200).json(note);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Note not found" });
    }
    res.status(500).send("Server Error");
  }
};

exports.deleteNoteById = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    // Make sure user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Note.findByIdAndRemove(req.params.id);

    res.status(200).json({ msg: "Note removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Note not found" });
    }
    res.status(500).send("Server Error");
  }
};


exports.deleteAllNotes = async (req, res) => {
  try {
    await Note.deleteMany({ user: req.user.id });
    res.json({ msg: "All notes removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
