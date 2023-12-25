import { loginRequest } from '../../api/auth';
import store from '../../../..';
/**
 * Экшен типа "GET_LOGIN_REQUEST".
 * @constant
 * @type {string}
 */
export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
/**
 * Экшен типа "GET_LOGIN_SUCCESS".
 * @constant
 * @type {string}
 */
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
/**
 * Экшен типа "GET_LOGIN_ERROR".
 * @constant
 * @type {string}
 */
export const GET_LOGIN_ERROR = 'GET_LOGIN_ERROR';
/**
 * Имя редьюсера для обработки экшенов связанных с авторизацией.
 * @constant
 * @type {string}
 */
export const LOGIN_REDUCER = 'LOGIN_REDUCER';
/**
 * Генерирует экшен запроса на вход.
 * @function
 * @returns {Object} Экшен с типом "GET_LOGIN_REQUEST".
 */
export const $loginRequest = () => ({ type: GET_LOGIN_REQUEST, reducerName: LOGIN_REDUCER });
/**
 * Генерирует экшен успешного входа.
 * @function
 * @param {string} userId - Идентификатор пользователя.
 * @returns {Object} Экшен с типом "GET_LOGIN_SUCCESS".
 */
export const $loginSuccess = (userId) => ({ type: GET_LOGIN_SUCCESS, payload: { isAuth: true, userId: userId }, reducerName: LOGIN_REDUCER });
/**
 * Генерирует экшен ошибки входа.
 * @function
 * @param {Error} error - Объект ошибки.
 * @returns {Object} Экшен с типом "GET_LOGIN_ERROR".
 */
export const $loginError = (error) => ({ type: GET_LOGIN_ERROR, payload: { isError: true, error: error }, reducerName: LOGIN_REDUCER });
/**
 * Выполняет запрос на вход пользователя.
 * @function
 * @param {string} email - Электронная почта пользователя.
 * @param {string} password - Пароль пользователя.
 * @param {Function} goToFeed - Функция для перехода к странице ленты после успешного входа.
 * @returns {void}
 */
export const $sentAuthRequest = (email, password, goToFeed) => {
    store.dispatch($loginRequest());
    loginRequest(email, password)
        .then(response => {
            if (response.body.id) {
                localStorage.setItem('userId', response.body.id);
                localStorage.setItem('authData', true);
                store.dispatch($loginSuccess(response.body.id));
                goToFeed();
            }
        })
        .catch(error => {
            store.dispatch($loginError(error));
        });
};
