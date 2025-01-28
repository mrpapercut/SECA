interface CurrentState {
    commander_name: string
    balance: number
    ship_type: string
    ship_name: string
    fuel_level: number
    fuel_capacity: number
    current_system: string
    body: string
    is_landed: boolean
    is_docked: boolean
    is_on_foot: boolean
    is_in_srv: boolean
    estimated_exploration_value: number
    estimated_biological_value: number
    systems_visited: number
    total_distance: number
    total_jumps: number
}

interface CurrentRoute {
    Position: number
    System: System
}

interface System {
    Name: string
    SystemAddress: number
    StarPosX: number
    StarPosY: number
    StarPosZ: number
    Bodies: Body[]
}

interface Body {
    Name: string
    BodyID: number
    BodyType: string
    StarType: string
    WasDiscovered: boolean
    WasMapped: boolean
    Discovered: boolean
    Mapped: boolean
    signals?: Signal[]
    exploration_scans?: ExplorationScan[]
    biological_scans?: BiologicalScan[]
    PlanetClass?: string
    TerraformState?: string
}

interface Signal {
    Type: string
    SubType: string
    Count: number
}

interface ExplorationScan {
    Timestamp: string
    EfficiencyTargetMet: boolean
    DataSold: boolean
    DataLost: boolean
    EstimatedEarnings: number
}

interface BiologicalScan {
    Timestamp: string
    Genus: string
    Species: string
    Variant: string
    DataSold: boolean
    DataLost: boolean
    EstimatedEarnings: number
}

interface BodyWithBioSignals {
    name: string
    bioSubtype: string[]
    count: number
    bodyID: number
}
