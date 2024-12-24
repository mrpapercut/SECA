const getBodyType = (type: string, isStar: boolean = false) => {
    if (isStar) {
        return getStarType(type);
    } else {
        return getPlanetType(type);
    }
}

export default getBodyType;

const getStarType = (type: string): number => {
    const starTypes = {
        "O (Blue-White) Star": 1,
        "B (Blue-White) Star": 2,
        "A (Blue-White) Star": 3,
        "F (White) Star": 4,
        "G (White-Yellow) Star": 5,
        "K (Yellow-Orange) Star": 6,
        "M (Red dwarf) Star": 7,

        "L (Brown dwarf) Star": 8,
        "T (Brown dwarf) Star": 9,
        "Y (Brown dwarf) Star": 10,

        "T Tauri Star": 11,
        "Herbig Ae/Be Star": 12,

        "Wolf-Rayet Star": 21,
        "Wolf-Rayet N Star": 22,
        "Wolf-Rayet NC Star": 23,
        "Wolf-Rayet C Star": 24,
        "Wolf-Rayet O Star": 25,

        "CS Star": 31,
        "C Star": 32,
        "CN Star": 33,
        "CJ Star": 34,
        "CH Star": 35,
        "CHd Star": 36,

        "MS-type Star": 41,
        "S-type Star": 42,

        "White Dwarf (D) Star": 51,

        "Neutron Star": 91,
        "Black Hole": 92,
        "Supermassive Black Hole": 93,
        "X": 94,
        "RoguePlanet": 111,
        "Nebula": 112,
        "StellarRemnantNebula": 113,

        "B (Blue-White super giant) Star": 201,
        "A (Blue-White super giant) Star": 301,
        "F (White super giant) Star": 401,

        "White Dwarf (DA) Star": 501,
        "White Dwarf (DAB) Star": 502,
        "White Dwarf (DAO) Star": 503,
        "White Dwarf (DAZ) Star": 504,
        "White Dwarf (DAV) Star": 505,
        "White Dwarf (DB) Star": 506,
        "White Dwarf (DBZ) Star": 507,
        "White Dwarf (DBV) Star": 508,
        "White Dwarf (DO) Star": 509,
        "White Dwarf (DOV) Star": 510,
        "White Dwarf (DQ) Star": 511,
        "White Dwarf (DC) Star": 512,
        "White Dwarf (DCV) Star": 513,
        "White Dwarf (DX) Star": 514,

        "K (Yellow-Orange giant) Star": 601,

        "M (Red giant) Star": 701,
        "M (Red super giant) Star": 702,

        "G (White-Yellow super giant) Star": 5001
    }

    return starTypes[type] || 0;
}

const getPlanetType = (type: string): number => {
    const planetTypes = {
        "Metal-rich body": 1,
        "High metal content world": 2,

        "Rocky body": 11,
        "Rocky Ice world": 12,

        "Icy body": 21,

        "Earth-like world": 31,

        "Water world": 41,
        "Water giant": 42,
        "Water giant with life": 43,

        "Ammonia world": 51,

        "Gas giant with water-based life": 61,
        "Gas giant with ammonia-based life": 62,

        "Class I gas giant": 71,
        "Class II gas giant": 72,
        "Class III gas giant": 73,
        "Class IV gas giant": 74,
        "Class V gas giant": 75,

        "Helium-rich gas giant": 81,
        "Helium gas giant": 82
    }

    return planetTypes[type] || 0;
}
