export class AtmosphereProperty {
    static readonly None    = 0;
    static readonly Rich    = 1;
    static readonly Thick   = 2;
    static readonly Thin    = 4;
    static readonly Hot     = 8;
}

export class AtmosphereType {
    static readonly EarthLike = 'suitable for water-based life';
    static readonly Ammonia = 'ammonia';
    static readonly Water = 'water';
    static readonly CarbonDioxide = 'carbon dioxide';
    static readonly Methane = 'methane';
    static readonly Helium = 'helium';
    static readonly Argon = 'argon';
    static readonly Neon = 'neon';
    static readonly SulphurDioxide = 'sulphur dioxide';
    static readonly Nitrogen = 'nitrogen';
    static readonly SilicateVapour = 'silicate vapour';
    static readonly MetallicVapour = 'metallic vapour';
    static readonly Oxygen = 'oxygen';
}
