declare namespace APIResponses {
    interface DefaultResponse {
        msg: string,
        msgnum: number
    }

    interface DefaultSystemResponse {
        id: number,
        id64: number,
        name: string,
        url: string
    }

    interface DefaultSystemStationResponse extends DefaultSystemResponse {
        marketId: number,
        sId: number,
        sName: string
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

    export interface SystemCelestialBodiesResponse extends DefaultSystemResponse {
        bodyCount: number,
        bodies: Array<Star | Planet>
    }

    export interface SystemEstimatedScanValuesResponse extends DefaultSystemResponse {
        estimatedValue: number,
        estimatedValueMapped: number,
        valuableBodies: Array<{
            bodyId: number,
            bodyName: string,
            distance: number,
            valueMax: number
        }>
    }

    export interface SystemStationsResponse extends DefaultSystemResponse {
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

    export interface SystemStationMarketResponse extends DefaultSystemStationResponse {
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

    export interface SystemStationShipyardResponse extends DefaultSystemStationResponse {
        ships: Array<{
            id: number,
            name: string
        }>
    }

    export interface SystemStationOutfittingResponse extends DefaultSystemStationResponse {
        outfitting: Array<{
            id: string,
            name: string
        }>
    }

    export interface SystemFactionsResponse extends DefaultSystemResponse {
        controllingFaction?: {
            id: number,
            name: string,
            allegiance: StationAllegiance,
            government: StationGovernment
        },
        factions: Array<{
            id: number,
            name: string,
            allegiance: StationAllegiance,
            government: StationGovernment,
            influence: number,
            state: FactionState,
            happiness: FactionHappiness,
            isPlayer: boolean,
            lastUpdate: number,
            activeStates: Array<{
                state: FactionState
            }>,
            recoveringStates: Array<{
                state: FactionState,
                trend: number
            }>,            
            pendingStates: Array<{
                state: FactionState,
                trend: number
            }>
        }>
    }

    export interface SystemTrafficResponse extends DefaultSystemResponse {
        discovery: {
            commander: string,
            date: string
        },
        traffic: {
            total: number,
            week: number,
            day: number
        },
        breakdown: {
            Adder?: number,
            'Alliance Challenger'?: number,
            'Alliance Chieftain'?: number,
            'Alliance Crusader'?: number,
            Anaconda?: number,
            'Asp Explorer'?: number,
            'Asp Scout'?: number,
            'Beluga Liner'?: number,
            'Cobra MkIII'?: number,
            'Cobra MkIV'?: number,
            'Diamondback Explorer'?: number,
            'Diamondback Scout'?: number,
            Dolphin?: number,
            'Eagle MkII'?: number,
            'Federal Assault Ship'?: number,
            'Federal Corvette'?: number,
            'Federal Dropship'?: number,
            'Federal Gunship'?: number,
            'Fer-de-Lance'?: number,
            Hauler?: number,
            'Imperial Clipper'?: number,
            'Imperial Courier'?: number,
            'Imperial Cutter'?: number,
            'Imperial Eagle'?: number,
            'Keelback'?: number,
            'Krait MkII'?: number,
            'Krait Phantom'?: number,
            Mamba?: number,
            Orca?: number,
            Python?: number,
            Sidewinder?: number,
            'Type-10 Defender'?: number,
            'Type-6 Transporter'?: number,
            'Type-7 Transporter'?: number,
            'Type-9 Heavy'?: number,
            'Viper MkIII'?: number,
            'Viper MkIV'?: number,
            Vulture?: number
        }
    }

    export interface SystemDeathsResponse extends DefaultSystemResponse {
        deaths: {
            total: number,
            week: number,
            day: number
        }
    }

    export interface SystemInformationResponse {
        name: string,
        id: number,
        id64: number,
        duplicates?: Array<number>,
        coords: Coordinates,
        coordsLocked: boolean,
        requirePermit: boolean,
        permitName?: string,
        information: {} | {
            allegiance: StationAllegiance,
            government: StationGovernment,
            faction: string,
            factionState: FactionState,
            population: number,
            security: SystemSecurity,
            economy: StationEconomy,
            secondEconomy: StationEconomy,
            reserve: SystemReserve
        },
        primaryStar: {} | {
            type: string,
            name: string,
            isScoopable: boolean
        }
    }
    
    export type SystemsInformationResponse = Array<SystemInformationResponse>

    interface SystemInSphereResponse extends SystemInformationResponse {
        distance: number,
        bodyCount: null | number
    }

    export type SystemsInSphereResponse = Array<SystemInSphereResponse>

    interface SystemInCubeResponse extends SystemInformationResponse {
        distance: number,
        bodyCount: null | number
    }
    
    export type SystemsInCubeResponse = Array<SystemsInCubeResponse>
}
