import { USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_ERROR } from '../actions/user-info';
/**
 * Начальное состояние редюсера пользователя.
 * @typedef {Object} initialState
 * @property {boolean} userRequest - Флаг, указывающий на выполнение запроса информации о пользователе.
 * @property {boolean} userSuccess - Флаг успешного выполнения запроса информации о пользователе.
 * @property {boolean} userError - Флаг ошибки при выполнении запроса информации о пользователе.
 * @property {null|Object} error - Объект ошибки при выполнении запроса информации о пользователе.
 * @property {null|Object} userInfo - Информация о пользователе.
 */
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
