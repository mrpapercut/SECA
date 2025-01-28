import {
    JOURNAL_SET_ROUTE
} from '../actions/journal';

let route: NavRoute.Route;

const initialState: ReduxStates.JournalState = {
    route
}

const journalReducer = (state = initialState, action) => {
    switch (action.type) {
        case JOURNAL_SET_ROUTE:
            return {
                ...state,
                route: action.payload
            }

        default:
            return state;
    }
};

export default journalReducer;
