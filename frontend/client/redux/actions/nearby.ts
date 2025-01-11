export const NEARBY_SET_NEARBY_SYSTEMS = 'NEARBY_SET_NEARBY_SYSTEMS';
export const setNearbySystems = (nearby: APIResponses.SystemsInCubeResponse) => ({
    type: NEARBY_SET_NEARBY_SYSTEMS,
    payload: nearby
});
