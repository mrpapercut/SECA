const express = require('express');
const bodyParser = require('body-parser');

const getNearbyTemplate = require('./templates/getNearby');
const get3dplotTemplate = require('./templates/3dplot');

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.send(getNearbyTemplate);
});

app.get('/plot', (req, res) => {
    res.send(get3dplotTemplate);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
