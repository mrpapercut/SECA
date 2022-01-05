import {
    randomBytes,
    createHash
} from 'crypto';

import {resolve} from 'path';

import fetch from 'node-fetch';
import {config as dotenv} from 'dotenv';

dotenv({
    path: resolve(__dirname, '../../../.env')
});

class APIClient {
    appName: string;

    apiClientId: string;
    apiSharedKey: string;

    // TODELETE
    authCode: string;
    authState: string;

    authUrl: string;
    capiUrl: string;

    access_token: string;
    refresh_token: string;
    token_type: string;

    code_challenge: string;
    code_verifier: string;
    state_string: string;

    constructor(clientId: string, sharedKey: string, authCode: string = '', authState: string = '') {
        this.appName = process.env.FDCAPI_APP_NAME;

        this.apiClientId = clientId;
        this.apiSharedKey = sharedKey;

        // TODELETE
        this.authCode = authCode;
        this.authState = authState;

        this.authUrl = 'https://auth.frontierstore.net';
        this.capiUrl = 'https://companion.orerve.net/';
    }

    private generateCodeChallenge() {
        const buffer = randomBytes(32);
        this.code_verifier = buffer.toString('base64url');

        const hash = createHash('sha256');
        hash.update(buffer);
        this.code_challenge = hash.digest('base64url');
    }

    private generateStateString() {
        const buffer = randomBytes(32);
        this.state_string = buffer.toString('base64url');
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
        params.append('redirect_uri', decodeURIComponent(process.env.FDCAPI_REDIRECT_URI));

        return params.toString();
    }

    public async getAuthUrl() {
        const url = `${this.authUrl}/auth?${this.getAuthParams()}`;

        console.log(url);
        console.log(this.code_verifier);
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
        params.append('code_verifier', 'wFH9G6r4Qx04aaD26JYjiX0AKh6VqfbpItrWp2UqIgQ'); // TODELETE
        // params.append('code_verifier', this.code_verifier);
        params.append('code', this.authCode);
        params.append('redirect_uri', decodeURIComponent(process.env.FDCAPI_REDIRECT_URI));

        console.log(params.toString());

        const response = await fetch(url, {
            headers: this.getAccessTokenHeaders(),
            method: 'POST',
            body: params
        });

        console.log(response);

        const data = await response.json();
        console.log(data);
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

const clientId = process.env.FDCAPI_CLIENT_ID;
const sharedKey = process.env.FDCAPI_SHARED_KEY;

const authCode = '';
const authState = '';

const client = new APIClient(clientId, sharedKey, authCode, authState);

if (authCode.length > 0 && authState.length > 0) {
    client.getAccessToken();
} else {
    console.log('No auth code or state, you need to login');
}

// client.getAuthUrl();

/** Process
 * - Get auth url
 *   - Log in
 *   - Manually (?) authorize
 * - Get code at redirect_uri (can be localhost)
 * - Use code to get access_token, refresh_token and token_type
 * - Use token_type and access_token to perform requests
 *  */

