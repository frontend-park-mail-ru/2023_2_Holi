import { SERIALS_CONTENT_ERROR, SERIALS_CONTENT_REQUEST, SERIALS_CONTENT_SUCCESS } from '../actions/serial-content';

const initialState = {
    serialsRequest: false,
    serialsSuccess: false,
    serialsError: false,
    error: null,
    serial: null,
};

export const serialReducer = (state = initialState, action) => {
    switch (action.type) {
        case SERIALS_CONTENT_REQUEST:
            return { ...state, serialsRequest: true };
        case SERIALS_CONTENT_SUCCESS:
            return { ...state, serialsRequest: false, serials: action.payload, serialsSuccess: true, serialsError: false, error: null };
        case SERIALS_CONTENT_ERROR:
            return { ...state, serialsRequest: false, serialsSuccess: false, serialsError: true };
        default:
            return state;
    }
};
