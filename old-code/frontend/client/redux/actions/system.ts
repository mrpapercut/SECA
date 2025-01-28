export const SYSTEM_SET_CURRENT_SYSTEM = 'SYSTEM_SET_CURRENT_SYSTEM';
export const setCurrentSystem = (system: APIResponses.SystemCelestialBodiesResponse) => ({
    type: SYSTEM_SET_CURRENT_SYSTEM,
    payload: system
});

export const SYSTEM_SET_SCAN_VALUES = 'SYSTEM_SET_SCAN_VALUES';
export const setScanValues = (scanValues: APIResponses.SystemEstimatedScanValuesResponse) => ({
    type: SYSTEM_SET_SCAN_VALUES,
    payload: scanValues
})
