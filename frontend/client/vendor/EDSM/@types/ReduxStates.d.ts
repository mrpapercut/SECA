declare namespace ReduxStates {
    export interface CommanderState {
        name: string
        lastPosition: APIResponses.CommanderLastPositionResponse
        credits: APIResponses.CommanderCreditsResponse
    }

    export interface SystemState {
        currentSystem: APIResponses.SystemCelestialBodiesResponse
        scanValues: APIResponses.SystemEstimatedScanValuesResponse
    }

    export interface JournalState {
        route: NavRoute.Route
    }

    export interface ReduxState {
        commander: CommanderState,
        system: SystemState,
        journal: JournalState
    }
}
