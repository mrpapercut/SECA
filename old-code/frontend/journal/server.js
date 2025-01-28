const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const port = 3001;

const navrouteFilePath = path.join(process.env.USERPROFILE, './Saved Games/Frontier Developments/Elite Dangerous', './NavRoute.json');
let currentRoute = {}

function readNavRoute() {
    const contents = fs.readFileSync(navrouteFilePath, { encoding: 'utf8' });

    try {
        const route = JSON.parse(contents);
        currentRoute = route;
    } catch (err) {
        console.log(err);
    }
}

readNavRoute();

fs.watch(navrouteFilePath, (event, filename) => {
    if (event === 'change') {
        readNavRoute();
    }
});

app.get('/navroute', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.send(JSON.stringify(currentRoute));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
