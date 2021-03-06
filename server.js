const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
const util = require("util");
const fs = require('fs');

var readFile = util.promisify(fs.readFile);
var writeFile = util.promisify(fs.writeFile);

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended:true}));

app.get('/api/notes', (req, res) => {
    readFile(
        path.join(__dirname, '/db/db.json'),
        "utf8"
    )
    .then(
        data => {
            res.json(JSON.parse(data))
        }
    )
   
  });

  app.post('/api/notes', (req, res) => {

    readFile(
        path.join(__dirname, '/db/db.json'),
        "utf8"
    )
    .then(
        data => {
            const notes = JSON.parse(data)

            req.body.id = notes.length.toString()

            notes.push(req.body)

            console.log(req.body)

            writeFile (
                path.join(__dirname, '/db/db.json'),
                JSON.stringify(notes)
            )

            .then (
                response => {
                    res.json(response)
                }
            )

        })

  });

  //app.delete('/api/notes/:id', (req, res) => {
    
    //readFile(
      //  path.join(__dirname, '/db/db.json'),
        //"utf8"
    //)
    //.then(
      //  data => {
        //    if 
            //var filteredNotes = notes.filter()

            //console.log(filteredNotes);

  app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    });

  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });

  //in delete rte where each notes id != that req.params(note.id) 