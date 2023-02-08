const router = require("express").Router();
const uuid = require("../helpers/uuid");
const utils = require("../helpers/fs-utilities");


router.get('/notes', async (req, res) => {
  try {
      const data = await utils.readFromFile('./db/db.json');
      res.status(200).json(JSON.parse(data));
  } catch(err) {
      console.error(err);
      res.status(400).json({ error: 'Unable to load notes. Please try again.' });
  }
});

router.get("/notes/:id", async (req, res) => {
  try {
    const notes = await utils.readFromFile("./db/db.json");
    const parsedNotes = JSON.parse(notes);
    const note = parsedNotes.find(n => n.id === req.params.id);
    if (!note) {
      res.status(404).json({ error: "Note not found" });
    } else {
      res.status(200).json(note);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong while retrieving the note" });
  }
});


router.post("/notes", async (req, res) => {
  try {
    if (!req.body.title || !req.body.text) {
      return res.status(400).json({ error: "Your note was not able to be posted. Please try again. Title and text are required fields" });
    }
    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid()
    };
    await utils.readAndAppend(newNote, "./db/db.json");
    res.status(201).json("Success");
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ error: "Your note was not able to be posted. Please try again." });
  }
});



module.exports = router;
