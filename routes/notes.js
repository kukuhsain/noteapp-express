const express = require("express");
const router = express.Router();

const dummyNotes = [];

router.get("/", (req, res) => {
  res.json({data: dummyNotes});
});

router.post("/", (req, res) => {
  const data = req.body;
  if (!data.title) return res.status(400).json({error: "Title cannot be empty!"});
  if (!data.content) return res.status(400).json({error: "Content cannot be empty!"});
  const note = {
    title: data.title,
    content: data.content,
  };
  dummyNotes.push(note);
  return res.json({data: note});
});

module.exports = router;
