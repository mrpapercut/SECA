/**
 * Listening server to connect to FD cAPI
 */
import {resolve} from 'path';

const express = require('express');
import {config as dotenv} from 'dotenv';

dotenv({
    path: resolve(__dirname, '../../.env')
});

// HTML templates
import homeTemplate from './htmltemplates/home';

import APIClient from './APIClient';

// APIClient setup
const appName: string = process.env.FDCAPI_APP_NAME;
const cmdr: string = process.env.COMMANDER_NAME;
const clientId: string = process.env.FDCAPI_CLIENT_ID;
const sharedKey: string = process.env.FDCAPI_SHARED_KEY;
const redirectUrl: string = process.env.FDCAPI_REDIRECT_URI;

const client = new APIClient(appName, clientId, sharedKey, redirectUrl, cmdr);

const server = express();
const port: string = process.env.FDCAPI_PORT;

server.get('/', async (req, res) => {
    res.send(homeTemplate());
});

server.get('/decode', async (req, res) => {
    const decoded = await client.decodeAccessToken();

    res.send(decoded);
});

server.get('/me', async (req, res) => {
    const me = await client.getMe();

    res.send(me);
});

server.get('/endpoints', async (req, res) => {
    const endpoints = await client.getAvailableEndpoints();

    res.send(endpoints);
});

server.get('/profile', async (req, res) => {
    const profile = await client.getCommanderProfile();

    res.send(profile);
});

server.get('/market', async (req, res) => {
    const market = await client.getCommodityMarket();

    res.send(market);
});

server.get('/shipyard', async (req, res) => {
    const shipyard = await client.getShipyard();

    res.send(shipyard);
});

server.get('/communitygoals', async (req, res) => {
    const communitygoals = await client.getCommunityGoals();

    res.send(communitygoals);
});

server.get('/fleetcarrier', async (req, res) => {
    const fleetcarrier = await client.getFleetCarrier();

    res.send(fleetcarrier);
});

server.get('/journal', async (req, res) => {
    const journal = await client.getJournal();

    res.send(journal);
});

// Don't unnecessarily call this
server.get('/auth_url', async (req, res) => {
    res.send(await client.getAuthUrl());
});

// Should only ever get called as redirect uri
server.get('/auth', async (req, res) => {
    const state = req.query.state;
    const auth_code = req.query.code;

    if (!state || !auth_code) res.redirect('/');

    // Store received code in db
    await client.updateAuth(state, auth_code);

    // Use code to fetch access_token
    if (await client.requestAccessToken(auth_code)) {
        res.send('Successfully got access_token');
    } else {
        res.send('Something went wrong, see console');
    }
});

server.listen(port, () => console.log(`Server listening on ${port}`));
