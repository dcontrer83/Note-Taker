const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.json');

//GET request for notes
notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        }
        else {
                const dataParse = JSON.parse(data);
                res.json(dataParse);
            }
    })
});

//POST request for new notes
notes.post('/', (req, res) => {
const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
            }
            else {
                const dataParse = JSON.parse(data);
                dataParse.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(dataParse), (err) => {
                    err ? console.error(err) : console.log(`Note had been written`)
                })
                res.json(`note has been added`);
            }
        })
    } else {
        res.error('Error in adding note')
    }
});

//Delete request to delete single note
notes.delete('/:id', (req, res) => {
    if(req.params.id) {
        const reviewId = req.params.id;
        for (let i = 0; i < db.length; i++ ) {
            const currentId = db[i];
            if(currentId.id === reviewId) {
                db.splice(i, 1);
                fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
                    err ? console.error(err) : console.log(`Note had been deleted`)
                })
                return res.send('Note had been deleted');
            }
        }
    }
})

module.exports = notes;