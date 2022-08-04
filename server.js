const fs = require("fs");
const express = require('express');
const path = require('path');
const app = express();

//Create local host port
const PORT = process.env.PORT || 3001;


// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

var data;
var oldNotes;
const oldNotesFunc = () => {
  data = fs.readFileSync("./db/db.json");
  oldNotes = JSON.parse(data);
}
oldNotesFunc();

// Helper method 
const uuid = require("./helpers/uuid");

// GET Route for notes
app.get("/notes", (req, res) => {
  let p = path.join(__dirname, "./public/notes.html");
  res.sendFile(p);
});

app.get("/api/notes", (req, res) => {
  oldNotesFunc();
  res.status(200).json(oldNotes);
});

// GET Route for homepage
app.get("*", (req, res) => {
  let p = path.join(__dirname, "./public/index.html");
  res.sendFile(p);
});

// POST request to add a note
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    // oldNotesFunc();
    oldNotes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(oldNotes, null, 4));

    res.json(newNote);
  } else {
    res.status(500).json("Missing title and/or text");
  }
});

app.delete("/api/notes/:id", (req, res) => {
  var id = req.params.id;

  // oldNotesFunc();
  const subtractedNotes = oldNotes.filter((oldNote) => {
    return oldNote.id != id;
  });

  fs.writeFileSync("./db/db.json", JSON.stringify(subtractedNotes, null, 4));
  res.json(subtractedNotes);
  console.log(`Note ${id} has been deleted.`)
});






app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});

