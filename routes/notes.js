const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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

notes.post('/', (req, res) => {
const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
    
        // readAndAppend(newNote, './db/db.json');
        // res.json(`Note added successfully 🚀`);
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

module.exports = notes;