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
}

(async () => {
    const apiKey: string = '396ae829334c9699f23cb74f7c1e1623f0e3b08e';
    const commanderName: string = 'anargeek';

    const client: APIClient = new APIClient(apiKey, commanderName);

    const testSystemsSmall = [
        'Deciat',
        'Sol',
        'HIP 33303',
        'Maia',
        'Swoilz KV-Z c2-13'
    ];
    const testSystemsMedium = [
        'HIP 40174',
        'Ngath',
        'Col 285 Sector EG-N c7-12',
        '133 G. Canis Major',
        'HIP 37171',
        'Col 285 Sector OS-T d3-146',
        'HIP 36901',
        'Col 285 Sector OS-T d3-145',
        'Col 285 Sector OS-T d3-116',
        'Col 285 Sector OS-T d3-75'
    ];
    const testSystemsLarge = ["Fomalhaut","Trappist-1","Ross 298","Uelliodhino","Ceti Sector CL-Y d57","Ceti Sector CL-Y d55","Pegasi Sector JW-W c1-21","HIP 759","Pegasi Sector EL-Y d54","Pegasi Sector FB-X c1-15","HIP 753","HIP 116360","HIP 112475","HIP 111081","Pegasi Sector FR-V c2-12","Madjandji","Pegasi Sector IX-T c3-28","HIP 103204","Col 285 Sector ZQ-L c8-20","HIP 101163","Col 285 Sector DX-J c9-17","Col 285 Sector DX-J c9-14","HIP 95362","Col 285 Sector BC-K c9-13","Col 285 Sector CC-K c9-20","HIP 84816","Bare","Atjirajan","Pontii","HIP 91507","Tsuki Yomi","Col 285 Sector TE-Q d5-97","HR 7280","Mehitak","HIP 98894","Bolon Huara","Col 285 Sector KY-H c10-13","Col 285 Sector JY-H c10-19","Col 285 Sector JY-H c10-17","Col 285 Sector TE-Q d5-107","Ither","19 Aquilae","Col 285 Sector TK-E c12-27","Col 285 Sector RP-E c12-9","HIP 88924","Col 285 Sector YK-O d6-111","Col 285 Sector YK-O d6-94","HIP 90869","Col 285 Sector WF-E c12-12","Col 285 Sector VK-E c12-24","Col 285 Sector XW-G b25-0","Col 285 Sector YK-O d6-92","HIP 84497","HIP 84684","Scorpii Sector CL-Y d75","HIP 90212","HIP 90590","HIP 94275","Kikapu","Karamayayak","HIP 99046","Capricorni Sector MX-U c2-21","25 chi Capricorni","b Capricorni","HIP 109271","Skat","HIP 110695","17 Beta Piscis Austrini","HIP 110084","HIP 108375","Kovae","Kisinga","Basuk","Ehwaz","Andhan","Praavapri","Shi Yu","Guarpulici","HIP 52351","Besta","HIP 65433","HR 4710","Col 285 Sector SE-M b22-8","Col 285 Sector QJ-M b22-0","Col 285 Sector VE-G c11-27","Col 285 Sector OO-M b22-6","Col 285 Sector RO-G c11-14","Jardonnere","HIP 65557","Hydrae Sector IR-W c1-19","Antliae Sector VZ-P b5-5","Antliae Sector GR-W d1-90","HIP 55469","Gliese 404","Grovicele","HIP 50070","HIP 46631","Col 285 Sector TY-W b16-3","Col 285 Sector KM-L c8-24","Col 285 Sector KM-L c8-23","Col 285 Sector OS-J c9-24","Col 285 Sector TT-H c10-4","Raniyan","Enet","Aurui","Ekoimunggu","Ch'iang Fei","LO Muscae","Tub Bajo","HR 5082","Paesui Xena","Verner","Ninhursag","Gamma Doradus","Maurr","LHS 1779","Banki","Ostya","Oserktomen","HIP 33818","Hyades Sector IC-U c3-11","HIP 33497","58 Geminorum","Hyades Sector EB-X d1-94","Hyades Sector IC-T b4-5","Hyades Sector IC-T b4-2","Hyades Sector KX-S b4-1","Hyades Sector FR-V c2-14","HIP 22350","HIP 21261","HIP 20577","HIP 20815","HIP 20850","HIP 20130","HIP 19793","51 Tauri","HIP 19789","HIP 20827","HIP 22688","HIP 24923","HIP 24180","Hyades Sector LH-V c2-3","Hyades Sector PN-T c3-7","Hyades Sector QN-T c3-12","Hyades Sector OS-T c3-2","Hyades Sector HW-W d1-103","Hyades Sector NS-T c3-8","Pentam","Hyades Sector HW-W d1-105","HIP 29133","HIP 29573","Hyades Sector MX-S b4-5","Hyades Sector GW-W d1-98","Kotigen","Ringgati","HIP 30949","Hyades Sector PD-S c4-9","Hyades Sector IH-V d2-130","Nandhis","Hyades Sector EB-X d1-58","Hyades Sector EB-X d1-71","Hyades Sector FW-V c2-20","Col 285 Sector AV-L b9-2","Saramorodia","HIP 42371","HIP 44728","Walmanglai","Lyncis Sector HW-W c1-10","HIP 42773","HIP 50327","31 Beta Leonis Minoris","18 Leonis Minoris","KashiGaut","HIP 45488","Col 285 Sector TO-P c6-9","HIP 48768","Adekalta","Col 285 Sector LX-T d3-74","Col 285 Sector XJ-P c6-10","Col 285 Sector ZE-P c6-22","Hun Hsinas","Col 285 Sector OS-T d3-65","HIP 43597","Col 285 Sector PS-T d3-119","HR 3419","Col 285 Sector GG-N c7-34","HR 3140","Col 285 Sector GG-N c7-15","Col 285 Sector OS-T d3-75","Col 285 Sector OS-T d3-116","Col 285 Sector OS-T d3-145","HIP 36901","Col 285 Sector OS-T d3-146","HIP 37171","133 G. Canis Major","Col 285 Sector EG-N c7-12","Ngath","Mahibitou","HIP 25795","Colonia"]

    // client.parseServerStatus(await client.getServerStatus());
    // client.parseCommanderRanks(await client.getCommanderRanks());
    // client.parseCommanderCredits(await client.getCommanderCredits());
    // client.parseCommanderMaterials(await client.getCommanderMaterials());
    // client.parseFlightLogs(await client.getFlightLogs());
    // client.parseCommanderLastPosition(await client.getCommanderLastPosition());
    // client.parseSystemCelestialBodies(await client.getSystemCelestialBodies('Swoilz KV-Z c2-13'));
    // client.parseSystemEstimatedScanValues(await client.getSystemEstimatedScanValues('Swoilz KV-Z c2-13'));
    // client.parseSystemStations(await client.getSystemStations(testSystemsSmall[1]));
    // client.parseSystemStationMarket(await client.getSystemStationMarket(testSystemsSmall[1], null, null, 'Ehrlich City'));
    // client.parseSystemStationShipyard(await client.getSystemStationShipyard(testSystemsSmall[1], null, null, 'Ehrlich City'));
    // client.parseSystemStationOutfitting(await client.getSystemStationOutfitting(testSystemsSmall[1], null, null, 'Ehrlich City'));
    // client.parseSystemFactions(await client.getSystemFactions(testSystemsSmall[1]));
    // testSystemsLarge.forEach(async s => client.parseSystemFactions(await client.getSystemFactions(s)))
    // client.parseSystemTraffic(await client.getSystemTraffic(testSystemsSmall[4]));
    // testSystemsLarge.forEach(async s => client.parseSystemTraffic(await client.getSystemTraffic(s)));
    // client.parseSystemDeaths(await client.getSystemDeaths(testSystemsSmall[4]));
    testSystemsLarge.forEach(async s => client.parseSystemDeaths(await client.getSystemDeaths(s)));


})();
