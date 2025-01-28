import {
    COMMANDER_SET_LAST_POSITION,
    COMMANDER_SET_CREDITS
} from '../actions/commander';

import { CMDRNAME } from '../../config';

let lastPosition: APIResponses.CommanderLastPositionResponse;
let credits: APIResponses.CommanderCreditsResponse;

const initialState: ReduxStates.CommanderState = {
    name: CMDRNAME,
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
