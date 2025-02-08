const translateState = (state: string): string => {
    const states: Record<string, string> = {
        flying: 'Flying',
        supercruise: 'In supercruise',
        supercruise_charging: 'Charging supercruise',
        jumping: 'Jumping',
        hyperdrive_charging: 'Charging friendship drive',
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
        bio_scanning: 'Scanning lifeforms',
    }

    return states[state] || '';
}

export default translateState
