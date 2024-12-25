declare namespace NavRoute {
    type RouteItem = {
        StarSystem: string
        SystemAddress: number
        StarPos: float[]
        StarClass: string
    }

    export interface Route {
        timestamp: string
        event: 'NavRoute' | 'NavRouteClear'
        Route: RouteItem[]
    }
}
