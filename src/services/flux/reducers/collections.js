import { COLLECTION_REQUEST, COLLECTION_PREVIEW, COLLECTION_SUCCESS, COLLECTION_ERROR } from '../actions/collections';

const initialState = {
    collectionsRequest: false,
    collectionsSuccess: false,
    collectionsError: false,
    error: null,
    collections: null,
    preview: null,
};

export const collectionsReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case COLLECTION_REQUEST:
            return { ...state, collectionsRequest: true };
        case COLLECTION_SUCCESS:
            return { ...state, collectionsRequest: false, collections: action.payload, collectionsSuccess: true, collectionsError: false, error: null };
        case COLLECTION_PREVIEW:
            return { ...state, preview: action.payload };
        case COLLECTION_ERROR:
            return { ...state, collectionsRequest: false, collectionsSuccess: false, collectionsError: true };
        default:
            return state;
    }
};
