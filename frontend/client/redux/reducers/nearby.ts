import {
    NEARBY_SET_NEARBY_SYSTEMS
} from '../actions/nearby';

let nearby: APIResponses.SystemsInCubeResponse;

const initialState: ReduxStates.NearbyState = {
    nearby
}

const nearbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEARBY_SET_NEARBY_SYSTEMS:
            return {
                ...state,
                nearby: action.payload
            }

        default:
            return state;
    }
};

export default nearbyReducer;
