declare namespace APIRequests {
    interface DefaultAuthRequest {
        commanderName: string,
        apiKey: string
    }

    interface DefaultSystemRequest {
        systemName: string,
        systemId?: null | number
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

    export interface SystemCelestialBodiesRequest extends DefaultSystemRequest {}

    export interface SystemEstimatedScanValuesRequest extends DefaultSystemRequest {}

    export interface SystemStationsRequest extends DefaultSystemRequest {}
}
