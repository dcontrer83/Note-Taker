const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

//Middleware for pasing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', api);

app.use(express.static('public'));

//GET Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

//GET Route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

//Listen for connections
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);