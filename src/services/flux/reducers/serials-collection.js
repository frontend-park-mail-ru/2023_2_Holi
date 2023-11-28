import { SERIALS_COLLECTION_REQUEST, SERIALS_COLLECTION_SUCCESS, SERIALS_COLLECTION_ERROR } from '../actions/serials-collection';

const initialState = {
    serialsRequest: false,
    serialsSuccess: false,
    serialsError: false,
    error: null,
    serials: null,
};

export const serialsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SERIALS_COLLECTION_REQUEST:
            return { ...state, serialsRequest: true };
        case SERIALS_COLLECTION_SUCCESS:
            return { ...state, serialsRequest: false, serials: action.payload, serialsSuccess: true, serialsError: false, error: null };
        case SERIALS_COLLECTION_ERROR:
            return { ...state, serialsRequest: false, serialsSuccess: false, serialsError: true };
        default:
            return state;
    }
};