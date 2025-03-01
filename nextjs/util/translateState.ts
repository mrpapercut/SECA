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
