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
  // Log that a POST request was received
  // console.info(`${req.method} request received to add a note`);
  
  // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text
      };

      readAndAppend(newNote, './db/db.json')
      res.json('note added')
    } else {
        res.error("error adding new note")
    }
});

module.exports = router