const Note = require("../models/notes");

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};



exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Note not found" });
    }
    res.status(500).send("Server Error");
  }
};

exports.addNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = new Note({
      title,
      content,
      user: req.user.id,
    });

    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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

    res.json(note);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
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

    res.json({ msg: "Note removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
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
