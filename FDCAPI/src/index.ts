/**
 * Listening server to connect to FD cAPI
 */
import {resolve} from 'path';

const express = require('express');
import {config as dotenv} from 'dotenv';

dotenv({
    path: resolve(__dirname, '../.env')
});

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
    res.send(await client.getAuthUrl());
});

server.get('/auth', (req, res) => {
    const state = req.query.state; // Same 'state' as in authUrl
    const code = req.query.code;

    client.updateAuth(state, code);

    res.sendStatus(200);
});

server.get('/token', (req, res) => {
    console.log(req.query);
    res.sendStatus(200);
});

server.listen(port, () => console.log(`Server listening on ${port}`));

/** Process
 * - Get auth url
 *   - Log in
 *   - Manually (?) authorize
 * - Get code at redirect_uri (can be localhost)
 * - Use code to get access_token, refresh_token and token_type
 * - Use token_type and access_token to perform requests
 *  */


