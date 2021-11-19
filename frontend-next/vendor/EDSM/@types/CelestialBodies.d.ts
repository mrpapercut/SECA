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
