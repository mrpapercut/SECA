import { Atmosphere, PlanetClass, Volcanism, StarType } from './Bodies'

interface BioConditions {
    species: string
    atmosphere?: Atmosphere[]
    planetClass?: PlanetClass[]
    volcanism?: Volcanism[]
    minGravity?: number
    maxGravity?: number
    minTemperature?: number
    maxTemperature?: number
    minDistanceFromStar?: number
    parentStar?: StarType[]
}

export const Bios: Record<string, BioConditions[]> = {
    Tussock: [{
        species: 'Albata',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
        minTemperature: 175,
        maxTemperature: 180,
    }, {
        species: 'Capillum',
        atmosphere: [Atmosphere.ThinArgon, Atmosphere.ThinArgonRich, Atmosphere.ThinMethane, Atmosphere.ThinMethaneRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
    }, {
        species: 'Caputus',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
        minTemperature: 180,
        maxTemperature: 190,
    }, {
        species: 'Catena',
        atmosphere: [Atmosphere.ThinAmmonia],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
    }, {
        species: 'Cultro',
        atmosphere: [Atmosphere.ThinAmmonia],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
    }, {
        species: 'Divisa',
        atmosphere: [Atmosphere.ThinAmmonia],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
    }, {
        species: 'Ignis',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
        minTemperature: 160,
        maxTemperature: 170,
    }, {
        species: 'Pennata',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
        minTemperature: 145,
        maxTemperature: 155,
    }, {
        species: 'Pennatis',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
        maxTemperature: 195,
    }, {
        species: 'Propagito',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
        maxTemperature: 195,
    }, {
        species: 'Serrati',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
        minTemperature: 170,
        maxTemperature: 175,
    }, {
        species: 'Stigmatis',
        atmosphere: [Atmosphere.ThinSulfurDioxide, Atmosphere.ThinSulfurDioxideRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
    }, {
        species: 'Triticum',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
        minTemperature: 190,
        maxTemperature: 195,
    }, {
        species: 'Ventusa',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
        minTemperature: 155,
        maxTemperature: 160,
    }, {
        species: 'Virgam',
        atmosphere: [Atmosphere.ThinWater, Atmosphere.ThinWaterRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.27,
    }],
    Bacterium: [{
        species: 'Acies',
        atmosphere: [Atmosphere.ThinNeon, Atmosphere.ThinNeonRich],
    }, {
        species: 'Alcyoneum',
        atmosphere: [Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich],
    }, {
        species: 'Aurasus',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
    }, {
        species: 'Bullaris',
        atmosphere: [Atmosphere.ThinMethane, Atmosphere.ThinMethaneRich],
    }, {
        species: 'Cerbrus',
        atmosphere: [Atmosphere.ThinWater, Atmosphere.ThinWaterRich, Atmosphere.ThinSulfurDioxide, Atmosphere.ThinSulfurDioxideRich],
    }, {
        species: 'Informem',
        atmosphere: [Atmosphere.ThinNitrogen, Atmosphere.ThinNitrogenRich],
    }, {
        species: 'Nebulus',
        atmosphere: [Atmosphere.ThinHelium, Atmosphere.ThinHeliumRich],
    }, {
        species: 'Omentum',
        atmosphere: [Atmosphere.ThinNeon, Atmosphere.ThinNeonRich],
        volcanism: [Volcanism.Nitrogen, Volcanism.Ammonia]
    }, {
        species: 'Scopulum',
        atmosphere: [Atmosphere.ThinNeon, Atmosphere.ThinNeonRich],
        volcanism: [Volcanism.CarbonDioxide, Volcanism.Methane]
    }, {
        species: 'Tela',
        atmosphere: [
            Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich,
            Atmosphere.ThinArgon, Atmosphere.ThinArgonRich,
            Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich,
            Atmosphere.ThinHelium, Atmosphere.ThinHeliumRich,
            Atmosphere.ThinMethane, Atmosphere.ThinMethaneRich,
            Atmosphere.ThinNeon, Atmosphere.ThinNeonRich,
            Atmosphere.ThinOxygen, Atmosphere.ThinOxygenRich,
            Atmosphere.ThinSilicateVapour, Atmosphere.ThinSilicateVapourRich,
            Atmosphere.ThinSulfurDioxide, Atmosphere.ThinSulfurDioxideRich,
            Atmosphere.ThinWater, Atmosphere.ThinWaterRich,
        ],
        volcanism: [Volcanism.Helium, Volcanism.Metallic, Volcanism.Silicate, Volcanism.Ammonia],
    }, {
        species: 'Verrata',
        atmosphere: [Atmosphere.ThinNeon, Atmosphere.ThinNeonRich],
        volcanism: [Volcanism.Water]
    }, {
        species: 'Vesicula',
        atmosphere: [Atmosphere.ThinArgon, Atmosphere.ThinArgonRich],
    }, {
        species: 'Volu',
        atmosphere: [Atmosphere.ThinOxygen, Atmosphere.ThinOxygenRich],
    }],
    Aleoida: [{
        species: 'Arcus',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
        minTemperature: 175,
        maxTemperature: 180,
    }, {
        species: 'Coronamus',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
        minTemperature: 180,
        maxTemperature: 190,
    }, {
        species: 'Gravis',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
        minTemperature: 190,
        maxTemperature: 195,
    }, {
        species: 'Laminiae',
        atmosphere: [Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
    }, {
        species: 'Spica',
        atmosphere: [Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
    }],
    Cactoida: [{
        species: 'Cortexum',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
        minTemperature: 180,
        maxTemperature: 195,
    }, {
        species: 'Lapis',
        atmosphere: [Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
    }, {
        species: 'Peperatis',
        atmosphere: [Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
    }, {
        species: 'Pullulanta',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
        minTemperature: 180,
        maxTemperature: 195,
    }, {
        species: 'Vermis',
        atmosphere: [Atmosphere.ThinWater, Atmosphere.ThinWaterRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
    }],
    Clypeus: [{
        species: 'Lacrimam',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
        minTemperature: 190,
    }, {
        species: 'Margaritus',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
        minTemperature: 190,
    }, {
        species: 'Speculumi',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
        minTemperature: 190,
        minDistanceFromStar: 2500,
    }],
    Concha: [{
        species: 'Aureolas',
        atmosphere: [Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich],
        maxGravity: 0.27,
    }, {
        species: 'Biconcavis',
        atmosphere: [Atmosphere.ThinNitrogen, Atmosphere.ThinNitrogenRich],
        maxGravity: 0.27,
    }, {
        species: 'Labiata',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        maxGravity: 0.27,
        maxTemperature: 190
    }, {
        species: 'Renibus',
        atmosphere: [Atmosphere.ThinWater, Atmosphere.ThinWaterRich],
        maxGravity: 0.27,
    }, {
        species: 'Renibus',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        maxGravity: 0.27,
        minTemperature: 180,
        maxTemperature: 195,
    }],
    Electricae: [{
        species: 'Pluma',
        atmosphere: [
            Atmosphere.ThinHelium, Atmosphere.ThinHeliumRich,
            Atmosphere.ThinNeon, Atmosphere.ThinNeonRich,
            Atmosphere.ThinArgon, Atmosphere.ThinArgonRich
        ],
        planetClass: [PlanetClass.IcyBody, PlanetClass.RockyIceBody],
        parentStar: [StarType.ClassA, StarType.ClassN, StarType.ClassD, StarType.ClassDA, StarType.ClassDAB, StarType.ClassDAO, StarType.ClassDAZ, StarType.ClassDAV, StarType.ClassDB, StarType.ClassDBZ, StarType.ClassDBV, StarType.ClassDO, StarType.ClassDOV, StarType.ClassDQ, StarType.ClassDC, StarType.ClassDCV, StarType.ClassDX],
        maxGravity: 0.27,
    }, {
        species: 'Pluma',
        atmosphere: [
            Atmosphere.ThinHelium, Atmosphere.ThinHeliumRich,
            Atmosphere.ThinNeon, Atmosphere.ThinNeonRich,
            Atmosphere.ThinArgon, Atmosphere.ThinArgonRich
        ],
        planetClass: [PlanetClass.IcyBody, PlanetClass.RockyIceBody],
        maxGravity: 0.27,
        // Must be within 100ly of a nebula, no idea how to check that
    }],
    Fonticulua: [{
        species: 'Campestris',
        atmosphere: [Atmosphere.ThinArgon, Atmosphere.ThinArgonRich],
        planetClass: [PlanetClass.IcyBody, PlanetClass.RockyIceBody],
        maxGravity: 0.27,
    }, {
        species: 'Digitos',
        atmosphere: [Atmosphere.ThinMethane, Atmosphere.ThinMethaneRich],
        planetClass: [PlanetClass.IcyBody, PlanetClass.RockyIceBody],
        maxGravity: 0.27,
    }, {
        species: 'Fluctus',
        atmosphere: [Atmosphere.ThinOxygen, Atmosphere.ThinOxygenRich],
        planetClass: [PlanetClass.IcyBody, PlanetClass.RockyIceBody],
        maxGravity: 0.27,
    }, {
        species: 'Lapida',
        atmosphere: [Atmosphere.ThinNitrogen, Atmosphere.ThinNitrogenRich],
        planetClass: [PlanetClass.IcyBody, PlanetClass.RockyIceBody],
        maxGravity: 0.27,
    }, {
        species: 'Segmentatus',
        atmosphere: [Atmosphere.ThinNeon, Atmosphere.ThinNeonRich],
        planetClass: [PlanetClass.IcyBody, PlanetClass.RockyIceBody],
        maxGravity: 0.27,
    }, {
        species: 'Upupam',
        atmosphere: [Atmosphere.ThinArgon, Atmosphere.ThinArgonRich],
        planetClass: [PlanetClass.IcyBody, PlanetClass.RockyIceBody],
        maxGravity: 0.27,
    }],
    Frutexa: [{
        species: 'Acus',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.RockyIceBody],
        maxGravity: 0.27,
        maxTemperature: 195,
    }, {
        species: 'Collum',
        atmosphere: [Atmosphere.ThinSulfurDioxide, Atmosphere.ThinSulfurDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.RockyIceBody],
        maxGravity: 0.27,
    }, {
        species: 'Fera',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.RockyIceBody],
        maxGravity: 0.27,
        maxTemperature: 195,
    }, {
        species: 'Flabellum',
        atmosphere: [Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.RockyIceBody],
        maxGravity: 0.27,
    }, {
        species: 'Flammasis',
        atmosphere: [Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.RockyIceBody],
        maxGravity: 0.27,
    }, {
        species: 'Metallicum',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
        maxTemperature: 195,
    }, {
        species: 'Metallicum',
        atmosphere: [Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich],
        planetClass: [PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
    }, {
        species: 'Sponsae',
        atmosphere: [Atmosphere.ThinWater, Atmosphere.ThinWaterRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.RockyIceBody],
        maxGravity: 0.27,
    }],
    Fumerola: [{
        species: 'Carbosis',
        planetClass: [PlanetClass.IcyBody, PlanetClass.RockyIceBody],
        volcanism: [Volcanism.CarbonDioxide, Volcanism.Methane],
        maxGravity: 0.27,
    }, {
        species: 'Extremus',
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        volcanism: [Volcanism.Silicate, Volcanism.Metallic, Volcanism.Rocky],
        maxGravity: 0.27,
    }, {
        species: 'Nitris',
        planetClass: [PlanetClass.IcyBody, PlanetClass.RockyIceBody],
        volcanism: [Volcanism.Nitrogen, Volcanism.Ammonia],
        maxGravity: 0.27,
    }],
    Fungoida: [{
        species: 'Bullarum',
        atmosphere: [Atmosphere.ThinArgon, Atmosphere.ThinArgonRich],
        maxGravity: 0.27,
    }, {
        species: 'Gelata',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        maxGravity: 0.27,
        minTemperature: 180,
        maxTemperature: 195,
    }, {
        species: 'Gelata',
        atmosphere: [Atmosphere.ThinWater, Atmosphere.ThinWaterRich],
        maxGravity: 0.27,
    }, {
        species: 'Setisis',
        atmosphere: [Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich, Atmosphere.ThinMethane, Atmosphere.ThinMethaneRich],
        maxGravity: 0.27,
    }, {
        species: 'Stabilis',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        maxGravity: 0.27,
        minTemperature: 180,
        maxTemperature: 195,
    }, {
        species: 'Stabilis',
        atmosphere: [Atmosphere.ThinWater, Atmosphere.ThinWaterRich],
        maxGravity: 0.27,
    }],
    Osseus: [{
        species: 'Cornibus',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
        minTemperature: 180,
        maxTemperature: 195,
    }, {
        species: 'Discus',
        atmosphere: [Atmosphere.ThinWater, Atmosphere.ThinWaterRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
    }, {
        species: 'Fractus',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
        minTemperature: 180,
        maxTemperature: 195,
    }, {
        species: 'Pellebantus',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
        minTemperature: 180,
        maxTemperature: 195,
    }, {
        species: 'Pumice',
        atmosphere: [
            Atmosphere.ThinArgon, Atmosphere.ThinArgonRich,
            Atmosphere.ThinMethane, Atmosphere.ThinMethaneRich,
            Atmosphere.ThinNitrogen, Atmosphere.ThinNitrogenRich,
        ],
        planetClass: [PlanetClass.RockyBody, PlanetClass.RockyIceBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
        minTemperature: 180,
        maxTemperature: 195,
    }, {
        species: 'Spiralis',
        atmosphere: [Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
    }],
    Recepta: [{
        species: 'Conditivus',
        atmosphere: [Atmosphere.ThinSulfurDioxide, Atmosphere.ThinSulfurDioxideRich],
        planetClass: [PlanetClass.IcyBody, PlanetClass.RockyIceBody],
        maxGravity: 0.27,
    }, {
        species: 'Deltahedronix',
        atmosphere: [Atmosphere.ThinSulfurDioxide, Atmosphere.ThinSulfurDioxideRich],
        planetClass: [PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
    }, {
        species: 'Umbrux',
        atmosphere: [Atmosphere.ThinSulfurDioxide, Atmosphere.ThinSulfurDioxideRich],
        planetClass: [PlanetClass.IcyBody, PlanetClass.RockyIceBody, PlanetClass.RockyBody, PlanetClass.HighMetalContentBody],
        maxGravity: 0.27,
    }],
    Stratum: [{
        species: 'Araneamus',
        atmosphere: [Atmosphere.ThinSulfurDioxide, Atmosphere.ThinSulfurDioxideRich],
        planetClass: [PlanetClass.RockyBody],
        minTemperature: 165,
    }, {
        species: 'Cucumisis',
        atmosphere: [
            Atmosphere.ThinSulfurDioxide, Atmosphere.ThinSulfurDioxideRich,
            Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich
        ],
        planetClass: [PlanetClass.RockyBody],
        minTemperature: 190,
    }, {
        species: 'Excutitus',
        atmosphere: [
            Atmosphere.ThinSulfurDioxide, Atmosphere.ThinSulfurDioxideRich,
            Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich
        ],
        planetClass: [PlanetClass.RockyBody],
        minTemperature: 165,
        maxTemperature: 190,
    }, {
        species: 'Frigus',
        atmosphere: [
            Atmosphere.ThinSulfurDioxide, Atmosphere.ThinSulfurDioxideRich,
            Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich
        ],
        planetClass: [PlanetClass.RockyBody],
        minTemperature: 190,
    }, {
        species: 'Laminamus',
        atmosphere: [Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich],
        planetClass: [PlanetClass.RockyBody],
        minTemperature: 165,
    }, {
        species: 'Limaxus',
        atmosphere: [
            Atmosphere.ThinSulfurDioxide, Atmosphere.ThinSulfurDioxideRich,
            Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich
        ],
        planetClass: [PlanetClass.RockyBody],
        minTemperature: 165,
        maxTemperature: 190,
    }, {
        species: 'Paleas',
        atmosphere: [
            Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich,
            Atmosphere.ThinWater, Atmosphere.ThinWaterRich,
            Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich
        ],
        planetClass: [PlanetClass.RockyBody],
        minTemperature: 165,
    }, {
        species: 'Tectonicas',
        planetClass: [PlanetClass.HighMetalContentBody],
        minTemperature: 165,
    }],
    Tubus: [{
        species: 'Cavas',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.15,
        minTemperature: 160,
        maxTemperature: 190,
    }, {
        species: 'Compagibus',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.15,
        minTemperature: 160,
        maxTemperature: 190,
    }, {
        species: 'Conifer',
        atmosphere: [Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.15,
        minTemperature: 160,
        maxTemperature: 190,
    }, {
        species: 'Rosarium',
        atmosphere: [Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich],
        planetClass: [PlanetClass.RockyBody],
        maxGravity: 0.15,
        minTemperature: 160,
    }, {
        species: 'Sororibus',
        atmosphere: [
            Atmosphere.ThinCarbonDioxide, Atmosphere.ThinCarbonDioxideRich,
            Atmosphere.ThinAmmonia, Atmosphere.ThinAmmoniaRich
        ],
        planetClass: [PlanetClass.HighMetalContentBody],
        maxGravity: 0.15,
        minTemperature: 160,
        maxTemperature: 190,
    }],
}
