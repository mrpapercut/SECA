class APIClient {
    apiKey: string;
    commanderName: string;

    constructor(apiKey: string, commanderName: string) {
        this.apiKey = apiKey;
        this.commanderName = commanderName;
    }

    private logOutput(...messages: any[]): void {
        const output: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById('output');
        messages.forEach(message => output.value += JSON.stringify(message, null, 2) + ',\n');
    }

    private async request(url: string = '', parameters: object) {
        const baseUrl: string = 'https://www.edsm.net';

        let searchString: string = '';

        if (Object.keys(parameters).length > 0) {
            const params: URLSearchParams = new URLSearchParams();

            for (let p in parameters) {
                if (parameters[p] instanceof Array) {
                    parameters[p].forEach(p1 => params.append(`${p}[]`, p1));
                } else {
                    params.set(p, parameters[p]);
                }
            }

            searchString = `?${params.toString()}`;
        }

        return fetch(`${baseUrl}${url}${searchString}`);
    }

    public async getServerStatus(): Promise<APIResponses.ServerStatusResponse> {
        const response = await this.request('/api-status-v1/elite-server', {});

        return await response.json();
    }

    public parseServerStatus(serverStatus: APIResponses.ServerStatusResponse): void {
        this.logOutput(serverStatus);
    }

    public async getCommanderRanks(): Promise<APIResponses.CommanderRanksResponse> {
        const params: APIRequests.CommanderRanksRequest = {
            apiKey: this.apiKey,
            commanderName: this.commanderName,
        }

        const response = await this.request('/api-commander-v1/get-ranks', params);

        return await response.json();
    }

    public parseCommanderRanks(commanderRanks: APIResponses.CommanderRanksResponse): void {
        this.logOutput(commanderRanks);
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

    public parseCommanderCredits(commanderCredits: APIResponses.CommanderCreditsResponse): void {
        this.logOutput(commanderCredits);
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

    public parseCommanderMaterials(commanderMaterials: APIResponses.CommanderMaterialsResponse): void {
        this.logOutput(commanderMaterials);
    }

    public async getFlightLogs(systemName: string = null, startDateTime: string = null, endDateTime: string = null, showId: 0 | 1 = 1): Promise<APIResponses.FlightLogsResponse> {
        const params: APIRequests.FlightLogsRequest = {
            apiKey: this.apiKey,
            commanderName: this.commanderName,
            showId
        }

        if (systemName) params.systemName = systemName;
        if (startDateTime) params.startDateTime = startDateTime;
        if (endDateTime) params.endDateTime = endDateTime;

        const response = await this.request('/api-logs-v1/get-logs', params);

        return await response.json();
    }

    public parseFlightLogs(flightLogs: APIResponses.FlightLogsResponse): void {
        this.logOutput(flightLogs);
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

    public parseCommanderLastPosition(commanderLastPosition: APIResponses.CommanderLastPositionResponse): void {
        this.logOutput(commanderLastPosition);
    }

    public async getSystemCelestialBodies(systemName: string, systemId?: number): Promise<APIResponses.SystemCelestialBodiesResponse> {
        const params: APIRequests.SystemCelestialBodiesRequest = {
            systemName
        }

        if (systemId) params.systemId = systemId;

        const response = await this.request('/api-system-v1/bodies', params);

        return await response.json();
    }

    public parseSystemCelestialBodies(systemCelestialBodies: APIResponses.SystemCelestialBodiesResponse): void {
        this.logOutput(systemCelestialBodies);
    }

    public async getSystemEstimatedScanValues(systemName: string, systemId?: number): Promise<APIResponses.SystemEstimatedScanValuesResponse> {
        const params: APIRequests.SystemEstimatedScanValuesRequest = {
            systemName
        }

        if (systemId) params.systemId = systemId;

        const response = await this.request('/api-system-v1/estimated-value', params);

        return await response.json();
    }

    public parseSystemEstimatedScanValues(systemEstimatedScanValues: APIResponses.SystemEstimatedScanValuesResponse): void {
        this.logOutput(systemEstimatedScanValues);
    }

    public async getSystemStations(systemName: string, systemId?: number): Promise<APIResponses.SystemStationsResponse> {
        const params: APIRequests.SystemStationsRequest = {
            systemName
        }

        if (systemId) params.systemId = systemId;

        const response = await this.request('/api-system-v1/stations', params);

        return await response.json();
    }

    public parseSystemStations(systemStations: APIResponses.SystemStationsResponse): void {
        this.logOutput(systemStations);
    }

    public async getSystemStationMarket(systemName: string, marketId?: number, systemId?: number, stationName?: string): Promise<APIResponses.SystemStationMarketResponse> {
        const params: APIRequests.SystemStationMarketRequest = {
            systemName
        }

        if (marketId) params.marketId = marketId;
        if (systemId) params.systemId = systemId;
        if (stationName) params.stationName = stationName;

        const response = await this.request('/api-system-v1/stations/market', params);

        return await response.json();
    }

    public parseSystemStationMarket(systemStationMarket: APIResponses.SystemStationMarketResponse): void {
        this.logOutput(systemStationMarket);
    }

    public async getSystemStationShipyard(systemName: string, marketId?: number, systemId?: number, stationName?: string): Promise<APIResponses.SystemStationShipyardResponse> {
        const params: APIRequests.SystemStationMarketRequest = {
            systemName
        }

        if (marketId) params.marketId = marketId;
        if (systemId) params.systemId = systemId;
        if (stationName) params.stationName = stationName;

        const response = await this.request('/api-system-v1/stations/shipyard', params);

        return await response.json();
    }

    public parseSystemStationShipyard(systemStationShipyard: APIResponses.SystemStationShipyardResponse): void {
        this.logOutput(systemStationShipyard);
    }

    public async getSystemStationOutfitting(systemName: string, marketId?: number, systemId?: number, stationName?: string): Promise<APIResponses.SystemStationOutfittingResponse> {
        const params: APIRequests.SystemStationMarketRequest = {
            systemName
        }

        if (marketId) params.marketId = marketId;
        if (systemId) params.systemId = systemId;
        if (stationName) params.stationName = stationName;

        const response = await this.request('/api-system-v1/stations/outfitting', params);

        return await response.json();
    }

    public parseSystemStationOutfitting(systemStationOutfitting: APIResponses.SystemStationOutfittingResponse): void {
        this.logOutput(systemStationOutfitting);
    }

    public async getSystemFactions(systemName: string, systemId?: number, showHistory: 0 | 1 = 0): Promise<APIResponses.SystemFactionsResponse> {
        const params: APIRequests.SystemFactionsRequest = {
            systemName,
            showHistory
        }

        if (systemId) params.systemId = systemId;

        const response = await this.request('/api-system-v1/factions', params);

        return await response.json();
    }

    public parseSystemFactions(systemFactions: APIResponses.SystemFactionsResponse): void {
        this.logOutput(systemFactions);
    }

    public async getSystemTraffic(systemName: string, systemId?: number): Promise<APIResponses.SystemTrafficResponse> {
        const params: APIRequests.SystemTrafficRequest = {
            systemName
        }

        if (systemId) params.systemId = systemId;

        const response = await this.request('/api-system-v1/traffic', params);

        return await response.json();
    }

    public parseSystemTraffic(systemTraffic: APIResponses.SystemTrafficResponse): void {
        this.logOutput(systemTraffic);
    }

    public async getSystemDeaths(systemName: string, systemId?: number): Promise<APIResponses.SystemDeathsResponse> {
        const params: APIRequests.SystemDeathsRequest = {
            systemName
        }

        if (systemId) params.systemId = systemId;

        const response = await this.request('/api-system-v1/deaths', params);

        return await response.json();
    }

    public parseSystemDeaths(systemDeaths: APIResponses.SystemDeathsResponse): void {
        this.logOutput(systemDeaths);
    }

    public async getSystemInformation(
        systemName: string, 
        showId: 0 | 1 = 1, 
        showCoordinates: 0 | 1 = 1, 
        showPermit: 0 | 1 = 1, 
        showInformation: 0 | 1 = 1, 
        showPrimaryStar: 0 | 1 = 1, 
        includeHidden: 0 | 1 = 0
    ): Promise<APIResponses.SystemInformationResponse> {
        const params: APIRequests.SystemInformationRequest = {
            systemName,
            showId,
            showCoordinates,
            showPermit,
            showInformation,
            showPrimaryStar,
            includeHidden
        }

        const response = await this.request('/api-v1/system', params);

        return await response.json();
    }

    public parseSystemInformation(system: APIResponses.SystemInformationResponse): void {
        this.logOutput(system);
    }

    public async getSystemsInformation(
        systemName: string | Array<string>, 
        showId: 0 | 1 = 1, 
        showCoordinates: 0 | 1 = 1, 
        showPermit: 0 | 1 = 1, 
        showInformation: 0 | 1 = 1, 
        showPrimaryStar: 0 | 1 = 1, 
        startDateTime: null | string = null, 
        endDateTime: null | string = null, 
        onlyKnownCoordinates: null | 1 = null, 
        onlyUnknownCoordinates: null | 1 = null, 
        includeHidden: 0 | 1 = 0
    ): Promise<APIResponses.SystemsInformationResponse> {
        const params: APIRequests.SystemsInformationRequest = {
            systemName,
            showId,
            showCoordinates,
            showPermit,
            showInformation,
            showPrimaryStar,
            includeHidden
        }

        if (startDateTime !== null) params.startDateTime = startDateTime;
        if (endDateTime !== null) params.endDateTime = endDateTime;
        if (onlyKnownCoordinates !== null) params.onlyKnownCoordinates = onlyKnownCoordinates;
        if (onlyUnknownCoordinates !== null) params.onlyUnknownCoordinates = onlyUnknownCoordinates;

        const response = await this.request('/api-v1/systems', params);

        return await response.json();
    }

    public parseSystemsInformation(systems: APIResponses.SystemsInformationResponse): void {
        this.logOutput(systems);
    }

    public async getSystemsInSphere(
        systemName: null | string, 
        x: null | number = null, 
        y: null | number = null, 
        z: null | number = null, 
        minRadius: number = 0, 
        radius: number = 50,
        showId: 0 | 1 = 1, 
        showCoordinates: 0 | 1 = 1, 
        showPermit: 0 | 1 = 1, 
        showInformation: 0 | 1 = 1, 
        showPrimaryStar: 0 | 1 = 1
    ): Promise<APIResponses.SystemsInSphereResponse> {
        const params: APIRequests.SystemsInSphereRequest = {
            systemName,
            x, y, z,
            minRadius,
            radius,
            showId,
            showCoordinates,
            showPermit,
            showInformation,
            showPrimaryStar
        }

        const response = await this.request('/api-v1/sphere-systems', params);

        return await response.json();
    }

    public parseSystemsInSphere(systems: APIResponses.SystemsInSphereResponse) {
        this.logOutput(systems);
    }

    public async getSystemsInCube(
        systemName: null | string, 
        x: null | number = null, 
        y: null | number = null, 
        z: null | number = null, 
        size: number = 100, 
        showId: 0 | 1 = 1, 
        showCoordinates: 0 | 1 = 1, 
        showPermit: 0 | 1 = 1, 
        showInformation: 0 | 1 = 1, 
        showPrimaryStar: 0 | 1 = 1
    ): Promise<APIResponses.SystemsInCubeResponse> {
        const params: APIRequests.SystemsInCubeRequest = {
            systemName,
            x, y, z,
            size,
            showId,
            showCoordinates,
            showPermit,
            showInformation,
            showPrimaryStar
        }

        const response = await this.request('/api-v1/cube-systems', params);

        return await response.json();
    }

    public parseSystemsInCube(systems: APIResponses.SystemsInCubeResponse) {
        this.logOutput(systems);
    }
}

export default APIClient;
