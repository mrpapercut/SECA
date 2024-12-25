import { createStore, combineReducers } from 'redux';

import commanderReducer from './reducers/commander';
import systemReducer from './reducers/system';
import wallpaperReducer from './reducers/wallpaper';
import journalReducer from './reducers/journal';

const combinedReducers = combineReducers({
    commander: commanderReducer,
    system: systemReducer,
    wallpaper: wallpaperReducer,
    journal: journalReducer
});

export const store = createStore(
    combinedReducers
);
