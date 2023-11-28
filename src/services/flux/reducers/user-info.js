import { USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_ERROR } from '../actions/user-info';

const initialState = {
    userRequest: false,
    userSuccess: false,
    userError: false,
    error: null,
    userInfo: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_INFO_REQUEST:
            return { ...state, userRequest: true };
        case USER_INFO_SUCCESS:
            return { ...state, userRequest: false, userInfo: action.payload, userSuccess: true, userError: false, error: null };
        case USER_INFO_ERROR:
            return { ...state, userRequest: false, userSuccess: false, userError: true };
        default:
            return state;
    }
};
