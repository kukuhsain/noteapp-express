import express from "express";
import {Note} from "../typeorm/entity/Note";

const router = express.Router();

// Get all notes
router.get("/", async (req, res) => {
    const notes = await Note.find();
    res.json({data: notes});
});

// Get a note
router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(404).json({error: "Not found!"});
    const note = await Note.findOne(id);
    if (!note) return res.status(404).json({error: "Not found!"});
    return res.json({data: note});
});

// Add note
router.post("/", async (req, res) => {
    const {title, content} = req.body;
    if (!title) return res.status(400).json({error: "Title cannot be empty!"});
    if (!content) return res.status(400).json({error: "Content cannot be empty!"});
    const note = await Note.create({
        title,
        content,
    }).save();
    return res.json({data: note});
});

// Update note
router.post("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(404).json({error: "Not found!"});
    const note = await Note.findOne(id);
    if (!note) return res.status(404).json({error: "Not found!"});
    const {title, content} = req.body;
    if (title) note.title = title;
    if (content) note.content = content;
    const updatedNote = await Note.save(note);
    return res.json({data: updatedNote});
});

export default router;
