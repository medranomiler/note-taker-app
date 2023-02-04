const router = require("express").Router();
const uuid = require("../helpers/uuid");
const utils = require("../helpers/fs-utilities");


router.get('/notes', async (req, res) => {
    const data = await utils.readFromFile('./db/db.json');
    res.json(JSON.parse(data));
});

router.post("/notes", async (req, res) => {
    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid()
    };
    await utils.readAndAppend(newNote, "./db/db.json");
  
    res.json("Success");
  });

module.exports = router;