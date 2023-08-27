const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note.js");

//ROUTE 1:GET all the notes of the validated user : GET "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("INTERNAL SERVER ERROR : Some error occured");
  }
});
//ROUTE 2:add a new note : POST "/api/notes/addnote". login required
router.post("/addnote", fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description","Description must have a minimum of 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
    const { title, description, tag, image } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    let noteFields = {
      title,
      description,
      tag,
      user: req.user.id,
    };

    if (image !== "") {
      noteFields.image = image;
    }

      const note = new Note(noteFields);
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      console.error(err);
      res.status(500).send("INTERNAL SERVER ERROR : Some error occured");
    }
});

//ROUTE 3:update an existing note : PUT "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser,
  async (req, res) => {
    try {
    const updatedTime = Date.now();
    const {title , description, tag, image } = req.body;
    const newNote = {};
    if(title){newNote.title = title;}
    if(description){newNote.description = description;}
    if(tag){newNote.tag = tag;}
    if(updatedTime){newNote.updatedTime = updatedTime;}
    if(image){newNote.image = image;}

    console.log(newNote);

    let note =await Note.findById(req.params.id);
    if(!note) res.status(404).send("NOT FOUND!");

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("NOT ALLOWED");
    }

    const note_upd = await Note.findByIdAndUpdate(req.params.id, {$set : newNote},{new : true});
    res.json(note_upd);
    } catch (err) {
    console.error(err);
    res.status(500).send("INTERNAL SERVER ERROR : Some error occured");
  }
  }
);

//ROUTE 3:delete an existing note : PUT "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser,
  async (req, res) => {
    try {
    //find the note to be deleted
    let note =await Note.findById(req.params.id);
    if(!note) res.status(404).send("NOT FOUND!");

    //allowed deletion if the user owns the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("NOT ALLOWED");
    }

    const note_del = await Note.findByIdAndDelete(req.params.id);
    res.json({"success" : "NOTE DELETED", "note" : note_del});
    } catch (err) {
    console.error(err);
    res.status(500).send("INTERNAL SERVER ERROR : Some error occured");
  }
  }
);


router.get('/getnote/:id', fetchuser,
  async (req, res) => {
    try {
    //find the note to be given
    let note =await Note.findById(req.params.id);
    if(!note) res.status(404).send("NOT FOUND!");

    //allowed getting if the user owns the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("NOT ALLOWED");
    }

    res.json({"success" : "NOTE given", "note" : note});
    } catch (err) {
    console.error(err);
    res.status(500).send("INTERNAL SERVER ERROR : Some error occured");
  }
  }
);

module.exports = router;
