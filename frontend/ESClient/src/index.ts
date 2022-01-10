import {resolve} from 'path';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

import ESClient from './ESClient';

import {config as dotenv} from 'dotenv';
if (!process.env.hasOwnProperty('ESCLIENT_PORT')) {
    dotenv({
        path: resolve(__dirname, '../../../.env')
    });
}

const app = express();
const port: string = process.env.ESCLIENT_PORT;

app.use(cors());
app.use(bodyParser.json());

app.post('/query', async (req, res) => {
    const client = new ESClient();
    await client.initialize();

    const response = await client.query(req.body);

    res.send(response);
});

app.listen(port, () => console.log(`ESClient listening on port ${port}`));
