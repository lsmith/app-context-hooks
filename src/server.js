const express = require('express');
// const bodyParser = require('bodyParser');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/todos', (req, res) => {
    res.json([
        { id: '1', description: 'Thing to do 1', done: false },
        { id: '2', description: 'Thing to do 2', done: false },
        { id: '3', description: 'Thing to do 3', done: false },
        { id: '4', description: 'Thing to do 4', done: true },
        { id: '5', description: 'Thing to do 5', done: false },
        { id: '6', description: 'Thing to do 6', done: false },
    ]);
});

app.post('/track', (req, res) => {
    console.log({ tracked: true });
    // No response to tracking requests
    res.status(204).send();
});

app.listen(process.env.PORT || 3001);