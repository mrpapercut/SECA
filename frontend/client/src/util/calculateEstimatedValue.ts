import getBodyType from './bodyType';

interface EstimatedValueOptions {
    haveMapped?: boolean
    isFirstDiscoverer?: boolean
    isFirstMapper?: boolean
    efficiencyBonus?: boolean
}

const calculateEstimatedValue = (mainType: string, subType: string, mass = 1, terraformState = false, options: EstimatedValueOptions = {}) => {
    let value = 0;
    let bonus = 0;

    let subTypeId = 0;

    if (mainType == 'Star') {
        value = 1200;

        subTypeId = getBodyType(subType, true);

        // White Dwarf Star
        if ([51, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514].includes(subTypeId)) {
            value = 14057;
        }

        // Neutron Star, Black Hole
        if ([91, 92].includes(subTypeId)) {
            value = 22628;
        }

        // Supermassive Black Hole
        if ([93].includes(subTypeId)) {
            // this is applying the same scaling to the 3.2 value as a normal black hole, not confirmed in game
            value = 33.5678;
        }

        return Math.round(value + (mass * value / 66.25));
    }

    if (mainType == 'Planet') {
        value = 300;

        subTypeId = getBodyType(subType, false);

        if (terraformState) {
            bonus = 93328;
        }

        // Metal-rich body
        if ([1].includes(subTypeId)) {
            value = 21790;
            bonus = 0;

            if (terraformState) {
                bonus = 65631;
            }
        }

        // Ammonia world
        if ([51].includes(subTypeId)) {
            value = 96932;
            bonus = 0;
        }

        // Class I gas giant
        if ([71].includes(subTypeId)) {
            value = 1656;
            bonus = 0;
        }

        // High metal content world / Class II gas giant
        if ([2, 72].includes(subTypeId)) {
            value = 9654;
            bonus = 0;

            if (terraformState) {
                bonus = 100677;
            }
        }

        // Earth-like world / Water world
        if ([31, 41].includes(subTypeId)) {
            value = 64831;
            bonus = 0;

            if (terraformState) {
                bonus = 116295;
            }

            if (subTypeId == 31) {// Earth Like...
                bonus = 116295;
            }
        }

        // CALCULATION
        const q = 0.56591828;
        value = value + bonus;
        let mapMultiplier = 1;

        if (options.haveMapped === true) {
            mapMultiplier = 3.3333333333;

            if (options.isFirstDiscoverer === true && options.isFirstMapper === true) {
                mapMultiplier = 3.699622554;
            }
            else if (options.isFirstDiscoverer === false && options.isFirstMapper === true) {
                mapMultiplier = 8.0956;
            }

            if (options.efficiencyBonus === true) {
                mapMultiplier *= 1.25;
            }
        }

        value = Math.max((value + (value * Math.pow(mass, 0.2) * q)) * mapMultiplier, 500);

        if (options.isFirstDiscoverer === true) {
            value *= 2.6;
        }

        return Math.round(value);
    }

    return 0;
}

export default calculateEstimatedValue;
