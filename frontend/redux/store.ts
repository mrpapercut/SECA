import {createStore, combineReducers} from 'redux';

import commanderReducer from './reducers/commander';
import systemReducer from './reducers/system';
import wallpaperReducer from './reducers/wallpaper';

const combinedReducers = combineReducers({
    commander: commanderReducer,
    system: systemReducer,
    wallpaper: wallpaperReducer
});

export const store = createStore(
    combinedReducers
);
