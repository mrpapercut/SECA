interface Coordinates {
    x: number
    y: number
    z: number
}

interface CurrentStatus {
    commander_name: string
    ship_name: string
    ship_type: string
    credits: number
    state: string
    current_system: string
    current_body: string
    current_sample: string
    sample_progress: number
    sample_base_value: number
    sample_ccr: number
    estimated_exploration_value: number
    estimated_biological_value: number
    systems_visited: number
    total_jumps: number
    total_distance: number
    fuel_level: number
    fuel_capacity: number
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
    FSSSignals: FSSSignal[]
    LastVisited: Date
    PrimaryStarType: string
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

interface FSSSignal {
    System: System
    SignalName: string
    SignalType: string
    IsStation: boolean
}

interface SystemSignalCount {
    [key: string]: number
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
    bodyID: number
    planetClass: PlanetClass
    distance: number
    bioSubtype: string[]
    count: number
}

interface CommanderInfo {
    commander_name: string
    ship_name: string
    ship_type: string
}
