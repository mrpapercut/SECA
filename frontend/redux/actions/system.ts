export const SYSTEM_SET_CURRENT_SYSTEM = 'SYSTEM_SET_CURRENT_SYSTEM';
export const setCurrentSystem = (system: APIResponses.SystemCelestialBodiesResponse) => ({
    type: SYSTEM_SET_CURRENT_SYSTEM,
    payload: system
});
