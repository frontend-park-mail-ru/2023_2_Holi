import { GET_LOGIN_ERROR, GET_LOGIN_SUCCESS, GET_LOGIN_REQUEST } from '../actions/auth';

const initialState = {
    authRequest: false,
    authSuccess: false,
    authError: false,
    error: null,
    userId: localStorage.getItem('userId') | null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOGIN_REQUEST:
            return { ...state, authRequest: true };
        case GET_LOGIN_SUCCESS:
            return { ...state, authRequest: false, userId: action.payload, authSuccess: true, authError: false, error: null };
        case GET_LOGIN_ERROR:
            return { ...state, authRequest: false, authSuccess: false, authError: true };
        default:
            return state;
    }
};
