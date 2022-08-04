const path = require('path');
const fs = require('fs');

let uniqid = require('uniqid');

module.exports = (app) => {

  app.get('/api/notes', (req, res) => {        
      res.sendFile(path.join(__dirname, '../db/db.json'));
  });
  
  app.post('/api/notes', (req, res) => {
      console.log('setting up new note');
      let db = fs.readFileSync('db/db.json');
      db = JSON.parse(db);

      let newNote = {
          title: req.body.title,  
          text: req.body.text,
          note_id: uniqid()
      };

      db.push(newNote);
      fs.writeFileSync('db/db.json', JSON.stringify(db));
      res.send(db);
  });

  app.delete('/api/notes/:id', (req, res) => {
      let db = JSON.parse(fs.readFileSync('db/db.json'));
      let deleteNote = db.filter(item => item.id !== req.params.id);
      fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));
      res.json(deleteNote);      
  });
}