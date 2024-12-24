import {
    SYSTEM_SET_CURRENT_SYSTEM,
    SYSTEM_SET_SCAN_VALUES
} from '../actions/system';

let currentSystem: APIResponses.SystemCelestialBodiesResponse;
let scanValues: APIResponses.SystemEstimatedScanValuesResponse;

const initialState: ReduxStates.SystemState = {
    currentSystem,
    scanValues
}

const systemReducer = (state = initialState, action) => {
    switch (action.type) {
        case SYSTEM_SET_CURRENT_SYSTEM:
            return {
                ...state,
                currentSystem: action.payload
            }

        case SYSTEM_SET_SCAN_VALUES:
            return {
                ...state,
                scanValues: action.payload
            }

        default:
            return state;
    }
};

export default systemReducer;
