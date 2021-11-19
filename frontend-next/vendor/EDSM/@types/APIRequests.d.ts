declare namespace APIRequests {
    interface DefaultAuthRequest {
        commanderName: string,
        apiKey: string
    }

    interface DefaultSystemRequest {
        systemName: string,
        systemId?: null | number
    }

    interface DefaultSystemStationRequest extends DefaultSystemRequest {
        marketId?: null | number,
        stationName?: string
    }

    interface DefaultSystemInformationRequest {
        showId: IntBoolean,
        showCoordinates: IntBoolean,
        showPermit: IntBoolean,
        showInformation: IntBoolean,
        showPrimaryStar: IntBoolean
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
        showId: IntBoolean
    }

    export interface CommanderLastPositionRequest extends DefaultAuthRequest {
        showId: IntBoolean,
        showCoordinates: IntBoolean
    }

    export interface SystemCelestialBodiesRequest extends DefaultSystemRequest {}

    export interface SystemEstimatedScanValuesRequest extends DefaultSystemRequest {}

    export interface SystemStationsRequest extends DefaultSystemRequest {}

    export interface SystemStationMarketRequest extends DefaultSystemStationRequest {}

    export interface SystemStationShipyardRequest extends DefaultSystemStationRequest {}

    export interface SystemStationOutfittingRequest extends DefaultSystemStationRequest {}

    export interface SystemFactionsRequest extends DefaultSystemRequest {
        showHistory: IntBoolean
    }

    export interface SystemTrafficRequest extends DefaultSystemRequest {}

    export interface SystemDeathsRequest extends DefaultSystemRequest {}

    export interface SystemInformationRequest extends DefaultSystemInformationRequest {
        systemName: string,
        includeHidden: IntBoolean
    }

    export interface SystemsInformationRequest extends DefaultSystemInformationRequest  {
        systemName: string | Array<string>,
        startDateTime?: null | string,
        endDateTime?: null | string,
        onlyKnownCoordinates?: null | 1,
        onlyUnknownCoordinates?: null | 1,
        includeHidden: IntBoolean
    }

    export interface SystemsInSphereRequest extends DefaultSystemInformationRequest {
        systemName: null | string,
        x: null | number,
        y: null | number,
        z: null | number,
        minRadius?: number,
        radius?: number
    }

    export interface SystemsInCubeRequest extends DefaultSystemInformationRequest {
        systemName: null | string,
        x: null | number,
        y: null | number,
        z: null | number,
        size?: number
    }
}
