const express = require('express');
const app = express();
const { notes } = require('./db/db.json');
const path = require('path');
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended:true}));

//function createNewNote(body, notesArray) {
  //  const notes = body;
    //notesArray.push(notes);
    //fs.writeFileSync(
      //  path.join(__dirname, './db/db.json'),
        //JSON.stringify({ notes: notesArray }, null, 2)
    //);
   // return notes;
//}

app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

  app.post('/api/notes', (req, res) => {

    console.log(req.body);
    res.json(req.body);
    req.body.id = notes.length.toString();

    //const notes = createNewNote(req.body, notes);
      //  res.json(notes);
 
  });

  app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
    });

  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });