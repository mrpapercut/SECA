const express = require('express');
const cors = require('cors');
const RPC = require('discord-rpc');

const constants = require('./constants');

const app = express();

const clientId = constants.discordClientId;

RPC.register(clientId);

const rpc = new RPC.Client({ transport: 'ipc' });

rpc.on('ready', () => {
    console.log('Discord rich presence connected');
});

rpc.login({ clientId }).catch(console.error);

app.use(express.json());
app.use(cors());

const startTimestamp = Date.now();

app.post('/update', (req, res) => {
    const { state } = req.body;

    if (!state) {
        return res.status(400).json({ error: 'missing state' });
    }

    rpc.setActivity({
        state,
        startTimestamp: startTimestamp,
        instance: false,
    });

    res.json({ status: 'updated presence' });
});

app.listen(3001, () => {
    console.log('listening on port 3001');
});
