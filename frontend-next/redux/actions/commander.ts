export const COMMANDER_SET_LAST_POSITION = 'COMMANDER_SET_LAST_POSITION';
export const setCommanderLastPosition = (lastPosition: APIResponses.CommanderLastPositionResponse) => ({
    type: COMMANDER_SET_LAST_POSITION,
    payload: lastPosition
});

export const COMMANDER_SET_CREDITS = 'COMMANDER_SET_CREDITS';
export const setCommanderCredits = (credits: APIResponses.CommanderCreditsResponse) => ({
    type: COMMANDER_SET_CREDITS,
    payload: credits
});
