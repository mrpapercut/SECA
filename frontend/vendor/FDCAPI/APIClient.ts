import {
    randomBytes,
    createHash
} from 'crypto';

class APIClient {
    apiClientId: string;
    apiSharedKey: string;

    authUrl: string;
    apiUrl: string;

    code_challenge: string;
    code_verifier: string;
    state_string: string;

    constructor(clientId: string, sharedKey: string) {
        this.apiClientId = clientId;
        this.apiSharedKey = sharedKey;

        this.authUrl = 'https://auth.frontierstore.net';
        this.apiUrl = ''
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

        return headers;
    }

    private getNonAuthParams() {
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
        params.append('redirect_uri', encodeURIComponent('https://github.com/mrpapercut/elited'));

        return params.toString();
    }

    private getAuthHeaders() {

    }

    public async getAccessToken() {
        const url = `${this.authUrl}/auth?${this.getNonAuthParams()}`;

        // const headers = this.getNonAuthHeaders();
        const params = this.getNonAuthParams();
        console.log(url);

        /*
        fetch(url, {
            method: 'POST',
            headers: [
                ['Content-Type', 'application/x-www-form-urlencoded']
            ],
            body: params
        })
        .then(response => response.json())
        .then(json => console.log(json));
        */
    }

    public async request() {

    }
}

const clientId = '';
const sharedKey = '';

const client = new APIClient(clientId, sharedKey);
// client.getAccessToken();
// Log in in browser
// Get code at redirect-uri
// Example: REDIRECT_URI/?code=12a21bcd-0b19-49e2-89ad-ad43e00bd9c3&state=rbHtJluGtMA46n0bbXfy-yt12IAB5OtppTyKzBoz-0s
