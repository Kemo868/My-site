const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
let stars = require('./stars.json');
app.get('/api/stars', (req, res) => {
res.json(stars);
});
app.get('/api/stars/:id', (req, res) => {
const star = stars.find(s => s.id === parseInt(req.params.id));
if (star) {
res.json(star);
} else {
res.status(404).send('Star not found');
}
});
app.post('/api/stars', (req, res) => {
const newStar = req.body;
newStar.id = stars.length + 1;
stars.push(newStar);
fs.writeFileSync('./stars.json', JSON.stringify(stars, null, 2));
res.status(201).json(newStar);
});
app.put('/api/stars/:id', (req, res) => {
const star = stars.find(s => s.id === parseInt(req.params.id));
if (star) {
Object.assign(star, req.body);
fs.writeFileSync('./stars.json', JSON.stringify(stars, null, 2));
res.json(star);
} else {
res.status(404).send('Star not found');
}
});
app.delete('/api/stars/:id', (req, res) => {
const index = stars.findIndex(s => s.id === parseInt(req.params.id));
if (index !== -1) {
stars.splice(index, 1);
fs.writeFileSync('./stars.json', JSON.stringify(stars, null, 2));
res.json({ message: `Star with ID ${req.params.id} has been
deleted.` });
} else {
res.status(404).send('Star not found');
}
});
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
