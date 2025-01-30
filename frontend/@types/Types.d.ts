interface CurrentStatus {
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
    LastVisited: Date
}

interface Body {
    Name: string
    BodyID: number
    WasDiscovered: boolean
    WasMapped: boolean
    Discovered: boolean
    Mapped: boolean
    Footfall: boolean
    DistanceFromArrivalLS: number
    signals?: Signal[]
    exploration_scans?: ExplorationScan[]
    biological_scans?: BiologicalScan[]
    BodyType: string
    SurfaceTemperature: number
    Radius: number
    SemiMajorAxis: number
    Eccentricity: number
    OrbitalInclination: number
    Periapsis: number
    OrbitalPeriod: number
    AscendingNode: number
    MeanAnomaly: number
    RotationPeriod: number
    AxialTilt: number

    // Star-specific
    StarType: StarType
    Subclass: number
    StellarMass: number
    AbsoluteMagnitude: number
    Age_MY: number
    Luminosity: string

    // Planet-specific
    TidalLock: boolean
    TerraformState: string
    PlanetClass: PlanetClass
    Atmosphere: string
    AtmosphereType: string
    // AtmosphereComposition AtmosphereComposition
    Volcanism: string
    MassEM: number
    SurfaceGravity: number
    SurfacePressure: number
    Landable: boolean
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
