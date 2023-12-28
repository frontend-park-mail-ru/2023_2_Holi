import { GET_LOGIN_ERROR, GET_LOGIN_SUCCESS, GET_LOGIN_REQUEST } from '../actions/auth';
/**
 * Начальное состояние редюсера авторизации.
 * @constant
 * @type {Object}
 * @property {boolean} authRequest - Флаг, указывающий, происходит ли запрос авторизации.
 * @property {boolean} authSuccess - Флаг успешной авторизации.
 * @property {boolean} authError - Флаг ошибки авторизации.
 * @property {null|number} userId - Идентификатор пользователя.
 * @property {null|Object} error - Объект ошибки.
 */
const initialState = {
    authRequest: false,
    authSuccess: false,
    authError: false,
    error: null,
    userId: localStorage.getItem('userId') | null,
};
/**
 * Редюсер авторизации.
 * @function
 * @param {Object} state - Текущее состояние редюсера.
 * @param {Object} action - Действие, которое нужно применить к состоянию.
 * @returns {Object} Новое состояние редюсера.
 */
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOGIN_REQUEST:
            return { ...state, authRequest: true };
        case GET_LOGIN_SUCCESS:
            return { ...state, authRequest: false, userId: action.payload, authSuccess: true, authError: false, error: null };
        case GET_LOGIN_ERROR:
            return { ...state, authRequest: false, authSuccess: false, authError: true, error: action.payload };
        default:
            return state;
    }
};
