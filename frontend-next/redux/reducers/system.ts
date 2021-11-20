import {
    SYSTEM_SET_CURRENT_SYSTEM
} from '../actions/system';

let currentSystem: APIResponses.SystemCelestialBodiesResponse;

const initialState = {
    currentSystem
}

const systemReducer = (state = initialState, action) => {
    switch (action.type) {
        case SYSTEM_SET_CURRENT_SYSTEM:
            return {
                ...state,
                currentSystem: action.payload
            }

        default:
            return state;
    }
};

export default systemReducer;
