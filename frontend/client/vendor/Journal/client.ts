class JournalClient {
    host: string

    constructor() {
        this.host = 'http://192.168.1.185:3001';
    }

    private async request(endpoint: string = '/') {
        const url = `${this.host}${endpoint}`;

        return fetch(url);
    }

    public async getRoute(): Promise<NavRoute.Route> {
        const endpoint = '/navroute';

        const res = await this.request(endpoint);

        return await res.json();
    }
}

export default JournalClient;
