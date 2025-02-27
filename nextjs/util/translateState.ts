export function translateState(state: string): string {
    const states: Record<string, string> = {
        flying: 'Flying',
        supercruise: 'In supercruise',
        supercruise_charging: 'Charging supercruise',
        jumping_to_supercruise: 'Jumping to supercruise',
        hyperdrive_charging: 'Charging frameshift drive',
        jumping_to_system: 'Jumping to system',
        docked: 'Docked',
        landed: 'Landed',
        in_srv: 'In SRV',
        on_foot: 'On foot',
        on_foot_station: 'On foot in station',
        on_foot_hangar: 'On foot in hangar',
        on_foot_planet: 'On foot on planet',
        on_foot_social_space: 'On foot in concourse',
        on_foot_exterior: 'On foot outside',
        fuel_scooping: 'Fuel scooping',
        in_fss_mode: 'Scanning bodies',
        in_saa_mode: 'Mapping body',
        viewing_galaxy_map: 'Viewing galaxy map',
        viewing_system_map: 'Viewing system map',
        viewing_orrery: 'Viewing system map (orrery)',
        viewing_station_services: 'Viewing station services',
        bio_scanning: 'Scanning lifeforms',
    }

    return states[state] || '';
}

export function translateDiscordState(state: string, systemName: string, bodyName?: string): string {
    let response = '';

    const systemSuffix = ` in system ${systemName}`;

    switch (state) {
        case 'flying':
            if (bodyName !== '') {
                response = `Flying near ${bodyName}` + systemSuffix;
            } else {
                response = 'Flying' + systemSuffix;
            }
            break;
        case 'supercruise':
            if (bodyName !== '') {
                response = `In supercruise near ${bodyName}` + systemSuffix;
            } else {
                response = 'Supercruising' + systemSuffix;
            }
            break;
        case 'hyperdrive_charging':
            response = `Preparing to jump to system ${systemName}`;
            break;
        case 'jumping_to_system':
            response = `Jumping to system ${systemName}`;
            break;
        case 'supercruise_charging':
            response = 'Preparing to jump to supercruise';
            break;
        case 'jumping_to_supercruise':
            response = 'Jumping to supercruise';
            break;
        case 'docked':
            response = `Docked at ${bodyName}` + systemSuffix;
            break;
        case 'landed':
            response = `Landed on body ${bodyName}` + systemSuffix;
            break;
        case 'in_srv':
            response = `Driving SRV on body ${bodyName}` + systemSuffix;
            break;
        case 'on_foot':
            if (bodyName !== '') {
                response = `Walking outside on body ${bodyName}` + systemSuffix;
            } else {
                response = 'Walking outside' + systemSuffix;
            }
            break;
        case 'on_foot_station':
            response = `Walking around in station ${bodyName}` + systemSuffix;
            break;
        case 'on_foot_hangar':
            response = `Walking around in hangar of station ${bodyName}` + systemSuffix;
            break;
        case 'on_foot_planet':
            response = `Walking around on planet ${bodyName}` + systemSuffix;
            break;
        case 'on_foot_social_space':
            response = `Walking around in the Concourse of ${bodyName}` + systemSuffix;
            break;
        case 'on_foot_exterior':
            response = `Walking outside on body ${bodyName}` + systemSuffix;
            break;
        case 'fuel_scooping':
            if (bodyName !== '') {
                response = `Fuel scooping at ${bodyName}` + systemSuffix;
            } else {
                response = 'Fuel scooping' + systemSuffix;
            }
            break;
        case 'in_fss_mode':
            response = 'Scanning bodies' + systemSuffix;
            break;
        case 'in_saa_mode':
            if (bodyName !== '') {
                response = `Mapping ${bodyName}` + systemSuffix;
            } else {
                response = 'Mapping body' + systemSuffix;
            }
            break;
        case 'viewing_galaxy_map':
            response = 'Viewing galaxy map';
            break;
        case 'viewing_system_map':
            response = 'Viewing system map' + systemSuffix;
            break;
        case 'viewing_orrery':
            response = 'Viewing system map (orrery)' + systemSuffix;
            break;
        case 'viewing_station_services':
            if (bodyName !== '') {
                response = `Viewing ${bodyName}'s station services` + systemSuffix;
            } else {
                response = 'Viewing station services' + systemSuffix;
            }
            break;
        case 'bio_scanning':
            response = `Scanning lifeforms on body ${bodyName}` + systemSuffix;
            break;
    }

    return response;
}
