const express = require("express");
const router = express.Router();

const dummyNotes = [];

const getNoteById = id => {
  for (let note of dummyNotes) {
    if (note.id === id) return note;
  }
  return null;
};

router.get("/", (req, res) => {
  res.json({data: dummyNotes});
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = getNoteById(id);
  if (!id || !note) return res.status(404).json({error: "Not found!"});
  return res.json({data: note});
});

router.post("/", (req, res) => {
  const data = req.body;
  if (!data.title) return res.status(400).json({error: "Title cannot be empty!"});
  if (!data.content) return res.status(400).json({error: "Content cannot be empty!"});
  const lastNote = dummyNotes[dummyNotes.length - 1];
  const note = {
    id: lastNote ? lastNote.id + 1 : 1,
    title: data.title,
    content: data.content,
  };
  dummyNotes.push(note);
  return res.json({data: note});
});

module.exports = router;
