const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const port = 3001;

const navrouteFilePath = path.join(process.env.USERPROFILE, './Saved Games/Frontier Developments/Elite Dangerous', './NavRoute.json');
let currentRoute = {}

fs.watch(navrouteFilePath, (event, filename) => {
    if (event === 'change') {
        const contents = fs.readFileSync(navrouteFilePath, { encoding: 'utf8' });
        const route = JSON.parse(contents);

        console.log(route);
    }
});

app.get('/navroute', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.send(JSON.stringify(currentRoute));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
