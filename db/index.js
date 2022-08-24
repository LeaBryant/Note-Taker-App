const fs = require('fs');
const path = require('path');
const {notes} = require('./db.json');

let uniqid = require('uniqid');

module.exports = (app) => {
    //get all notes
    app.get('/api/notes', (req, res) => {        
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    //Get single note
    app.get('/api/notes/:id', (req, res) => {
      if (req.param.note_id) {
        const noteId = req.params.note_id;
        for(let i = 0; i < notes.length; i++) {
            const currentNote = notes[i];   
            if (currentNote.note_id === noteId) {
                res.json(currentNote);
                return;
            }
        }    
      }
    }
    );
    //Create new note    
    app.post('/api/notes', (req, res) => {
        console.log('setting up new note');
        let db = fs.readFileSync('db/db.json');
        db = JSON.parse(db);

        let newNote = {
            title: req.body.title,  
            text: req.body.text,
            note_id: uniqid()
        };
        //add new note to db
        db.push(newNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.send(db);
    });

// delete a note from dbArray
function deleteNote(id, noteArray) {
    var selectedNote = findById(id, noteArray);
    var notesIndex = noteArray.indexOf(selectedNote);

    // remove note from array and create new dbArray
    newNoteArray = noteArray.splice(notesIndex, 1);

    fs.writeFileSync(
        path.join(__dirname, './db.json'),
        JSON.stringify({ notes: newNoteArray }, null, 2)
    );
    
};

// function to validate data
// in POST route's callback before creating and adding data, it will now pass through this function above
// if any data fails validation, the note will not be created (see app.post for error)
function validateNote(note) {
    if (!note.title) {
        return false;
    }
    if (!note.text) {
        return false;
    }
    return true;
};

module.exports = { saveNewNote, findById, deleteNote, validateNote };
}