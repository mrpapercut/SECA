declare namespace APIResponses {
    interface DefaultResponse {
        msg: string,
        msgnum: number
    }

    export interface ServerStatusResponse {
        lastUpdate: string,
        type: string,
        message: string,
        status: number
    }

    export interface CommanderRanksResponse extends DefaultResponse {
        progress: {
            CQC: number,
            Combat: number,
            Empire: number,
            Exobiologist: number,
            Explore: number,
            Federation: number,
            Soldier: number,
            Trade: number,
        },
        ranks: {
            CQC: number,
            Combat: number,
            Empire: number,
            Exobiologist: number,
            Explore: number,
            Federation: number,
            Soldier: number,
            Trade: number,
        },
        ranksVerbose: {
            CQC: RanksCQC,
            Combat: RanksCombat,
            Empire: string,
            Exobiologist: RanksExobiologist,
            Explore: RanksExplorer,
            Federation: string,
            Soldier: RanksMercenary,
            Trade: RanksTrader,
        }
    }

    export interface CommanderCreditsResponse extends DefaultResponse {
        credits: Array<{
            balance: number,
            date: string,
            loan: number
        }>
    }

    type CommanderMaterialResponse = Array<{
        type: string | number,
        name: string,
        qty: number
    }>

    export interface CommanderMaterialsResponse extends DefaultResponse {
        cargo?: CommanderMaterialResponse,
        data?: CommanderMaterialResponse,
        materials?: CommanderMaterialResponse,
    }

    export interface FlightLogsResponse extends DefaultResponse {
        startDateTime: string,
        endDateTime: string,
        logs: Array<{
            date: string,
            firstDiscover: boolean,
            shipId: null | number,
            system: string,
            systemId: number,
            systemId64: number
        }>
    }

    export interface CommanderLastPositionResponse extends DefaultResponse {
        coordinates: Coordinates,
        date: string,
        dateDocked: string,
        dateLastActivity: string,
        firstDiscover: boolean,
        isDocked: boolean,
        shipFuel: null | number,
        shipId: null | number,
        shipType: string,
        station: null | string,
        stationId: null | number,
        system: string,
        systemId: null | number,
        systemId64: number,
        url: string
    }

    export interface SystemCelestialBodiesResponse {
        id: number,
        id64: number,
        bodyCount: number,
        name: string,
        url: string,
        bodies: Array<Star | Planet>
    }

    export interface SystemEstimatedScanValuesResponse {
        id: number,
        id64: number,
        name: string,
        url: string,
        estimatedValue: number,
        estimatedValueMapped: number,
        valuableBodies: Array<{
            bodyId: number,
            bodyName: string,
            distance: number,
            valueMax: number
        }>
    }

    export interface SystemStationsResponse {
        id: number,
        name: string,
        stations: Array<{
            id: number,
            marketId: number,
            type: string,
            name: string,
            body?: {
                id: number,
                name: string,
                latitude?: number,
                longitude?: number,
            },
            distanceToArrival: number,
            allegiance: StationAllegiance,
            government: StationGovernment,
            economy: StationEconomy,
            secondEconomy: StationEconomy | null,
            haveMarket: boolean,
            haveShipyard: boolean,
            haveOutfitting: boolean,
            otherServices: Array<StationServices>,
            controllingFaction: {
                id: number,
                name: string
            },
            updateTime: {
                information: string | null,
                market: string | null,
                shipyard: string | null,
                outfitting: string | null
            }
        }>
    }

    export interface SystemStationMarketResponse {
        id: number,
        id64: number,
        name: string,
        marketId: number,
        sId: number,
        sName: string,
        url: string,
        commodities: Array<{
            id: string,
            name: string,
            buyPrice: number,
            stock: number,
            sellPrice: number,
            demand: number,
            stockBracket: number
        }>
    }
}
