class APIClient {
    apiKey: string;
    commanderName: string;

    constructor(apiKey: string, commanderName: string) {
        this.apiKey = apiKey;
        this.commanderName = commanderName;
    }

    private async request(url: string = '', parameters: object) {
        const baseUrl: string = 'https://www.edsm.net';

        let searchString: string = '';

        if (Object.keys(parameters).length > 0) {
            const params: URLSearchParams = new URLSearchParams();

            for (let p in parameters) {
                params.set(p, parameters[p]);
            }

            searchString = `?${params.toString()}`;
        }

        return fetch(`${baseUrl}${url}${searchString}`);
    }

    public async getServerStatus(): Promise<APIResponses.ServerStatusResponse> {
        const response = await this.request('/api-status-v1/elite-server', {});

        return await response.json();
    }

    public async getCommanderRanks(): Promise<APIResponses.CommanderRanksResponse> {
        const params: APIRequests.CommanderRanksRequest = {
            apiKey: this.apiKey,
            commanderName: this.commanderName,
        }

        const response = await this.request('/api-commander-v1/get-ranks', params);

        return await response.json();
    }

    public async getCommanderCredits(period: APIRequests.CommanderCreditsPeriod = null): Promise<APIResponses.CommanderCreditsResponse> {
        const params: APIRequests.CommanderCreditsRequest = {
            apiKey: this.apiKey,
            commanderName: this.commanderName,
            period
        }

        const response = await this.request('/api-commander-v1/get-credits', params);

        return await response.json();
    }

    public async getCommanderMaterials(type: APIRequests.CommanderMaterialsType = 'materials'): Promise<APIResponses.CommanderMaterialsResponse> {
        const params: APIRequests.CommanderMaterialsRequest = {
            apiKey: this.apiKey,
            commanderName: this.commanderName,
            type
        }

        const response = await this.request('/api-commander-v1/get-materials', params);

        return await response.json();
    }

    public async getFlightLogs(systemName: string = null, startDateTime: string = null, endDateTime: string = null): Promise<APIResponses.FlightLogsResponse> {
        const params: APIRequests.FlightLogsRequest = {
            apiKey: this.apiKey,
            commanderName: this.commanderName,
            showId: 1
        }

        if (systemName) params.systemName = systemName;
        if (startDateTime) params.startDateTime = startDateTime;
        if (endDateTime) params.endDateTime = endDateTime;

        const response = await this.request('/api-logs-v1/get-logs', params);

        return await response.json();
    }

    public async getCommanderLastPosition(): Promise<APIResponses.CommanderLastPositionResponse> {
        const params: APIRequests.CommanderLastPositionRequest = {
            apiKey: this.apiKey,
            commanderName: this.commanderName,
            showId: 1,
            showCoordinates: 1
        }

        const response = await this.request('/api-logs-v1/get-position', params);

        return await response.json();
    }

    public async getSystemCelestialBodies(systemName: string, systemId?: number): Promise<APIResponses.SystemCelestialBodiesResponse> {
        const params: APIRequests.SystemCelestialBodiesRequest = {
            systemName
        }

        if (systemId) params.systemId = systemId;

        const response = await this.request('/api-system-v1/bodies', params);

        return await response.json();
    }

    public async getSystemEstimatedScanValues() {}

    public async getSystemStations() {}

    public async getSystemStationMarket() {}

    public async getSystemStationShipyard() {}

    public async getSystemStationOutfitting() {}

    public async getSystemFactions() {}

    public async getSystemTraffic() {}

    public async getSystemDeaths() {}
}

(async () => {
    const apiKey: string = '396ae829334c9699f23cb74f7c1e1623f0e3b08e';
    const commanderName: string = 'anargeek';

    const client: APIClient = new APIClient(apiKey, commanderName);
    
    // console.log(await client.getServerStatus());
    // console.log(await client.getCommanderRanks());
    // console.log(await client.getCommanderCredits());
    // console.log(await client.getCommanderMaterials());
    // console.log(await client.getFlightLogs());
    // console.log(await client.getCommanderLastPosition());
    // console.log(await client.getSystemCelestialBodies('Deciat'));
})();

