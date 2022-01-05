import {
    randomBytes,
    createHash
} from 'crypto';

import got from 'got';

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
        this.capiUrl = 'https://companion.orerve.net/';

        this.redirectUrl = redirectUrl;

        this.db = new SQLite();
    }

    private generateCodeChallenge() {
        const buffer = randomBytes(32);
        this.code_verifier = buffer.toString('base64'); // MUST include trailing '='

        const hash = createHash('sha256');
        hash.update(buffer);
        this.code_challenge = hash.digest('base64url'); // MUST NOT include trailing '='
    }

    private generateStateString() {
        const buffer = randomBytes(32);
        this.state_string = buffer.toString('base64url'); // MUST NOT include trailing '=', replace '+' with '-', and replace '/' with '_'
    }

    private getNonAuthHeaders() {
        const headers: Headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        headers.append('User-Agent', this.appName);

        return headers;
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

        // UPSERT auth SET state, code_challenge, code_verifier, cmdrname
        if (!this.db.ready()) {
            await this.db.init();
        }

        const res = await this.db.addAuth(this.cmdrName, this.state_string, this.code_challenge, this.code_verifier);

        return url;
    }

    public updateAuth(state: string, code: string) {
        // UPDATE auth SET code: code WHERE state: state
        console.log({code, state});
    }

    private getAccessTokenHeaders() {
        /*
        const headers: Headers = new Headers();

        headers.append('User-Agent', this.appName);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        */
        const headers = {
           'User-Agent': this.appName,
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        return headers;
    }

    public async getAccessToken() {
        const url: string = `${this.authUrl}/token`;

        const params: URLSearchParams = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', this.apiClientId);
        params.append('code_verifier', this.code_verifier);
        // params.append('code', this.authCode);
        params.append('redirect_uri', decodeURIComponent(`${this.redirectUrl}/token`));

        console.log(params.toString());

        const response = await fetch(url, {
            headers: this.getAccessTokenHeaders(),
            method: 'POST',
            body: params
        });

        console.log(response);

        const data = await response.json();
        console.log(data);

        // UPDATE auth SET token_type, access_token, refresh_token, expires WHERE state: state
    }

    private async getRequestHeaders() {
        const headers: Headers = new Headers();

        headers.append('Authorization', `${this.token_type} ${this.access_token}`);
        headers.append('User-Agent', this.appName);
    }

    public async request() {

    }

    public async getEndpoints() {

    }
}

export default APIClient;
