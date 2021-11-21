import {
    COMMANDER_SET_LAST_POSITION,
    COMMANDER_SET_CREDITS
} from '../actions/commander';

let lastPosition: APIResponses.CommanderLastPositionResponse;
let credits: APIResponses.CommanderCreditsResponse;

const initialState = {
    name: process.env.NEXT_PUBLIC_COMMANDER_NAME,
    lastPosition,
    credits
}

const commanderReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMMANDER_SET_LAST_POSITION:
            return {
                ...state,
                lastPosition: action.payload
            }

        case COMMANDER_SET_CREDITS:
            return {
                ...state,
                credits: action.payload
            }

        default:
            return state;
    }
};

export default commanderReducer;
