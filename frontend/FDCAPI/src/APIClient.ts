import {
    randomBytes,
    createHash
} from 'crypto';

import fetch from 'node-fetch';

import SQLite from './SQLite';

class APIClient {
    db: SQLite;

    appName: string;

    cmdrName: string;

    apiClientId: string;
    apiSharedKey: string;

    authUrl: string;
    capiUrl: string;

    redirectUrl: string;

    access_token: string;
    refresh_token: string;
    token_type: string;

    code_challenge: string;
    code_verifier: string;
    state_string: string;

    constructor(appName: string, clientId: string, sharedKey: string, redirectUrl: string, cmdrName: string) {
        this.appName = appName;
        this.cmdrName = cmdrName;

        this.apiClientId = clientId;
        this.apiSharedKey = sharedKey;

        this.authUrl = 'https://auth.frontierstore.net';
        this.capiUrl = 'https://companion.orerve.net';

        this.redirectUrl = redirectUrl;

        this.db = new SQLite();
    }

    private generateCodeChallenge() {
        const buffer = randomBytes(32);
        this.code_verifier = buffer.toString('base64url');

        const hash = createHash('sha256');
        hash.update(this.code_verifier);
        this.code_challenge = hash.digest('base64url');
    }

    private generateStateString() {
        const buffer = randomBytes(32);
        this.state_string = buffer.toString('base64url');
    }

    private getAuthParams() {
        const params: URLSearchParams = new URLSearchParams();

        if (!this.code_challenge) this.generateCodeChallenge();
        if (!this.state_string) this.generateStateString();

        params.append('audience', 'all');
        params.append('scope', 'auth capi');
        params.append('response_type', 'code');
        params.append('client_id', this.apiClientId);
        params.append('code_challenge', this.code_challenge);
        params.append('code_challenge_method', 'S256');
        params.append('state', this.state_string);
        params.append('redirect_uri', decodeURIComponent(`${this.redirectUrl}/auth`));

        return params.toString();
    }

    public async getAuthUrl() {
        const url = `${this.authUrl}/auth?${this.getAuthParams()}`;

        if (!this.db.ready()) await this.db.init();

        const res = await this.db.addAuth(this.cmdrName, this.state_string, this.code_challenge, this.code_verifier);

        return url;
    }

    public async updateAuth(state: string, code: string) {
        if (!this.db.ready()) await this.db.init();

        const res = await this.db.updateAuth(state, code);

        // TODO Error handling
    }

    private getAccessTokenHeaders() {
        const headers = {
           'User-Agent': this.appName,
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        return headers;
    }

    public async requestAccessToken(auth_code: string) {
        const url: string = `${this.authUrl}/token`;

        if (!this.db.ready()) await this.db.init();

        const row = await this.db.getByAuthCode(auth_code);

        const body = `grant_type=authorization_code`
            + `&client_id=${this.apiClientId}`
            + `&code_verifier=${encodeURIComponent(row.code_verifier)}`
            + `&code=${auth_code}`
            + `&redirect_uri=${encodeURIComponent(`${this.redirectUrl}/auth`)}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: this.getAccessTokenHeaders(),
            body
        });

        const json = await response.json();

        if (response.ok) {
            const {access_token, token_type, refresh_token, expires_in} = json;

            this.db.storeAccessToken(row.cmdr, access_token, token_type, refresh_token, expires_in);

            return true;
        } else {
            console.error(json);

            return false;
        }
    }

    // Will fetch new access token if expired. Fails if no token available or auth expired
    public async getAccessToken(cmdr: string) {
        if (!this.db.ready()) await this.db.init();

        const {access_token, token_type, expires_at, refresh_token} = await this.db.getAccessToken(cmdr);

        if (new Date() > new Date(expires_at)) {
            console.log('Access token expired, fetching new one');

            await this.refreshAccessToken(cmdr, refresh_token);
        } else {
            return {access_token, token_type};
        }
    }

    private async refreshAccessToken(cmdr: string, refresh_token: string) {
        const url: string = `${this.authUrl}/token`;

        const body = `grant_type=refresh_token`
            + `&client_id=${this.apiClientId}`
            + `&client_secret=${this.apiSharedKey}`
            + `&refresh_token=${refresh_token}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: this.getAccessTokenHeaders(),
            body
        });

        const json = await response.json();

        console.log(json);
    }

    private getRequestHeaders(access_token: string, token_type: string) {
        const headers = {
            'Authorization': `${token_type} ${access_token}`,
            'User-Agent': this.appName
        }

        return headers;
    }

    private async performRequest(endpoint: string = '/') {
        const {access_token, token_type} = await this.getAccessToken(this.cmdrName);

        const url = `${this.capiUrl}${endpoint}`;

        const headers = this.getRequestHeaders(access_token, token_type);

        const response = await fetch(url, {
            headers
        });

        if (response.status === 204) {
            console.log('Response 204 - No Content');

            return {};
        }

        try {
            const json = await response.json();

            return json;
        } catch (err) {
            console.warn(err);
            console.log(response);
        }
    }

    public async decodeAccessToken() {
        const url = `${this.authUrl}/decode`;

        const {access_token, token_type} = await this.getAccessToken(this.cmdrName);

        const headers = this.getRequestHeaders(access_token, token_type);

        const response = await fetch(url, {
            headers
        });

        return await response.json();
    }

    public async getMe() {
        const url = `${this.authUrl}/me`;

        const {access_token, token_type} = await this.getAccessToken(this.cmdrName);

        const headers = this.getRequestHeaders(access_token, token_type);

        const response = await fetch(url, {
            headers
        });

        return await response.json();
    }

    public async getAvailableEndpoints() {
        const endpoints = await this.performRequest();

        return endpoints;
    }

    public async getCommanderProfile() {
        const profile = await this.performRequest('/profile');

        return profile;
    }

    public async getCommodityMarket() {
        const market = await this.performRequest('/market');

        return market;
    }

    public async getShipyard() {
        const shipyard = await this.performRequest('/shipyard');

        return shipyard;
    }

    public async getCommunityGoals() {
        const communitygoals = await this.performRequest('/communitygoals');

        return communitygoals;
    }

    public async getFleetCarrier() {
        const fleetcarrier = await this.performRequest('/fleetcarrier');

        return fleetcarrier;
    }

    public async getJournal(date: Date = null) {
        let endpoint = '/journal';

        if (date) {
            const year = date.getUTCFullYear();
            const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
            const day = date.getUTCDate().toString().padStart(2, '0');

            endpoint = `${endpoint}/${year}/${month}/${day}`;
        }

        const {access_token, token_type} = await this.getAccessToken(this.cmdrName);

        const url = `${this.capiUrl}${endpoint}`;

        const headers = this.getRequestHeaders(access_token, token_type);

        const response = await fetch(url, {
            headers
        });

        if (response.status === 204) {
            console.log('Response 204 - No Content');

            return {};
        }

        // Need to reformat response to get valid JSON
        const textContents = await response.text();
        const journalEntries = [];
        textContents.split('\r\n').forEach((line, idx) => {
            if (line.length !== 0) {
                try {
                    let parsed = JSON.parse(line);
                    journalEntries.push(parsed);
                } catch (e) {
                    console.warn(`Error on line ${idx}: ${line}`);
                }
            }
        });

        return journalEntries;
    }
}

export default APIClient;
