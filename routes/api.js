const { notes } = require('../db/db.json');
const { saveNewNote, findById, validateNote, deleteNote } = require('../db/index.js');

// start instance of Router
const router = require('express').Router();

// // add unique ids to notes
// const { default: ShortUniqueId } = require('short-unique-id');
// const uid = new ShortUniqueId();

router.get('/notes', (req, res) => {
    let results = notes;

    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes)
    if (result) {
        res.json(result);
        console.log(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    // set unique id for note and append
    req.body.id = uid();
    // validate data and deny if fields are empty
    if(!validateNote(req.body)) {
        res.status(404).send("Please complete each text field before saving.")
    } else {
        const note = saveNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    console.log(req.params);
    const result = deleteNote(req.params.id, notes);
    res.json(result);
});

module.exports = router;