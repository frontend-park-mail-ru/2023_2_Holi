import { GET_FAVOURITES } from '../actions/like';

const initialState = {
    favourites: null,
};

export const favouritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FAVOURITES:
            return { ...state, favourites: action.payload };
        default:
            return state;
    }
};
