import {
    WALLPAPER_SET_GALLERY
} from '../actions/wallpaper';

const initialState = {
    gallery: []
}

const wallpaperReducer = (state = initialState, action) => {
    switch (action.type) {
        case WALLPAPER_SET_GALLERY:
            return {
                ...state,
                gallery: action.payload
            }

        default:
            return state;
    }
};

export default wallpaperReducer;
