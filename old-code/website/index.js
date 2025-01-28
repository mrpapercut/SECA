const path = require('path');
const express = require('express');

const htmltemplate = require('./htmltemplate.js');

const server = express();

const port = 4000;
const router = express.Router();

// Add CORS Header
server.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    next();
});

server.use('/assets', express.static(path.resolve(process.cwd(), './assets')));

router.get('/seca', (req, res) => {
    res.send(htmltemplate());
});

// All other requests
router.get('/', (req, res) => {
    res.redirect('/seca');
});

server.use(router);

server.listen(port, () => console.log(`Server listening on port ${port}`));