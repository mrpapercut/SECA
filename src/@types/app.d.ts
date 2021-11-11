type Coordinates = {
    x: number,
    y: number,
    z: number
}

type Materials = {
    Antimony?: number,
    Arsenic?: number,
    Boron?: number,
    Cadmium?: number,
    Carbon?: number,
    Chromium?: number,
    Germanium?: number,
    Iron?: number,
    Lead?: number,
    Manganese?: number,
    Mercury?: number,
    Molybdenum?: number,
    Nickel?: number,
    Niobium?: number,
    Phosphorus?: number,
    Polonium?: number,
    Rhenium?: number,
    Ruthenium?: number,
    Selenium?: number,
    Sulphur?: number,
    Technetium?: number,
    Tellurium?: number,
    Tin?: number,
    Tungsten?: number,
    Vanadium?: number,
    Yttrium?: number,
    Zinc?: number,
    Zirconium?: number
}

type CelestialBody = {
    id: number,
    id64: number,    
    bodyId: number,
    name: string,
    discovery: {
        commander: string,
        date: string
    },
    subType: string,
    parents: Array<{
        Null?: number,
        Star?: number,
        Planet?: number
    }>,
    distanceToArrival: number,
    orbitalPeriod: number,
    semiMajorAxis: number,
    orbitalEccentricity: number,
    orbitalInclination: number,
    argOfPeriapsis: number,
    rotationalPeriod: number,
    rotationalPeriodTidallyLocked: boolean,
    axialTilt: null | number,
    updateTime: string
}

interface Star extends CelestialBody {
    type: 'Star',    
    isMainStar: boolean,
    isScoopable: boolean,
    age: number,
    spectralClass: string,
    luminosity: string,
    absoluteMagnitude: number,
    solarMasses: number,
    solarRadius: number,
    surfaceTemperature: number,
    belts?: Array<{
        name: string,
        type: string,
        mass: number,
        innerRadius: number,
        outerRadius: number
    }>
}

interface Planet extends CelestialBody {
    type: 'Planet',
    isLandable: boolean,
    gravity: number,
    earthMasses: number,
    radius: number,
    surfaceTemperature: number,
    surfacePressure: number,
    volcanismType: string,
    atmosphereType: string,
    atmosphereComposition: {
        Argon?: number,
        Ammonia?: number,
        'Carbon dioxide'?: number,
        Hydrogen?: number,
        Helium?: number,
        Iron?: number,
        Neon?: number,
        Methane?: number,
        Nitrogen?: number,
        Oxygen?: number,
        Silicates?: number,
        'Sulphur dioxide'?: number,
        Water?: number
    },
    solidComposition: {
        Rock: number,
        Metal: number,
        Ice: number
    },
    terraformingState: string,
    materials?: Materials,
    rings?: Array<{
        name: string,
        type: string,
        mass: number,
        innerRadius: number,
        outerRadius: number
    }>,
    reserveLevel?: string
}

declare namespace APIRequests {
    interface DefaultAuthRequest {
        commanderName: string,
        apiKey: string
    }

    export interface CommanderRanksRequest extends DefaultAuthRequest {}

    export type CommanderCreditsPeriod = null | '7DAY' | '1MONTH' | '3MONTH' | '6MONTH';

    export interface CommanderCreditsRequest extends DefaultAuthRequest {
        period: CommanderCreditsPeriod
    }

    export type CommanderMaterialsType = 'materials' | 'data' | 'cargo';

    export interface CommanderMaterialsRequest extends DefaultAuthRequest {
        type: CommanderMaterialsType
    }

    export interface FlightLogsRequest extends DefaultAuthRequest {
        systemName?: null | string,
        startDateTime?: null | string,
        endDateTime?: null | string,
        showId: 0 | 1
    }

    export interface CommanderLastPositionRequest extends DefaultAuthRequest {
        showId: 0 | 1,
        showCoordinates: 0 | 1
    }

    export interface SystemCelestialBodiesRequest {
        systemName: string,
        systemId?: null | number
    }
}

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
            CQC: string,
            Combat: string,
            Empire: string,
            Exobiologist: string,
            Explore: string,
            Federation: string,
            Soldier: string,
            Trade: string,
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
}
