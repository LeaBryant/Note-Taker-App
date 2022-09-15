const router = require('express').Router();
const {
    readFromFile,
    readAndAppend,
} = require('../utils');

// GET request for notes
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
  
// POST request to add a note
  router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
// Object that will be saved
      const newNote = {
        title,
        text
      };

      readAndAppend(newNote, './db/db.json')
      res.json('✅')
    } else {
        res.error("❌")
    }
});

module.exports = router