export default function translateShipType(shipType: string): string {
    const shipNames: Record<string, string> = {
        adder: 'Adder',
        anaconda: 'Anaconda',
        asp: 'Asp Explorer',
        asp_scout: 'Asp Scout',
        belugaliner: 'Beluga Liner',
        cobramkiii: 'Cobra MkIII',
        cobramkiv: 'Cobra MkIV',
        corvair: 'Corvair',
        clipper: 'Panther Clipper',
        cutter: 'Imperial Cutter',
        diamondback: 'Diamondback Scout',
        diamondbackxl: 'Diamondback Explorer',
        dolphin: 'Dolphin',
        eagle: 'Eagle',
        empire_courier: 'Imperial Courier',
        empire_eagle: 'Imperial Eagle',
        empire_fighter: 'Imperial Fighter',
        empire_trader: 'Imperial Clipper',
        federation_corvette: 'Federal Corvette',
        federation_dropship: 'Federal Dropship',
        federation_dropship_mkii: 'Federal Assault Ship',
        federation_gunship: 'Federal Gunship',
        federation_fighter: 'F63 Condor',
        ferdelance: 'Fer-de-Lance',
        hauler: 'Hauler',
        independant_trader: 'Keelback',
        independent_fighter: 'Taipan Fighter',
        krait_mkii: 'Krait MkII',
        krait_light: 'Krait Phantom',
        mamba: 'Mamba',
        mandalay: 'Mandalay',
        orca: 'Orca',
        python: 'Python',
        scout: 'Taipan Fighter',
        sidewinder: 'Sidewinder',
        testbuggy: 'Scarab SRV',
        type6: 'Type-6 Transporter',
        type7: 'Type-7 Transporter',
        type9: 'Type-9 Heavy',
        type9_military: 'Type-10 Defender',
        typex: 'Alliance Chieftain',
        typex_2: 'Alliance Crusader',
        typex_3: 'Alliance Challenger',
        viper: 'Viper MkIII',
        viper_mkiv: 'Viper MkIV',
        vulture: 'Vulture',
    }

    return shipNames[(shipType || '').toLowerCase()] || '';
}
