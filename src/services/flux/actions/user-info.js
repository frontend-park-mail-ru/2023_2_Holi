import store from '../../../..';
import { getUserInfo } from '../../api/user';
/**
 * Экшен типа "USER_INFO_REQUEST".
 * @constant
 * @type {string}
 */
export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
/**
 * Экшен типа "USER_INFO_SUCCESS".
 * @constant
 * @type {string}
 */
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
/**
 * Экшен типа "USER_INFO_ERROR".
 * @constant
 * @type {string}
 */
export const USER_INFO_ERROR = 'USER_INFO_ERROR';

/**
 * Генераторы экшенов для работы с информацией о пользователе.
 */
export const USER_REDUCER = 'USER_REDUCER';
/**
 * Генерирует экшен для запроса информации о пользователе.
 * @function
 * @returns {Object} Экшен с типом "USER_INFO_REQUEST".
 */
export const $userInfoRequest = () => ({ type: USER_INFO_REQUEST, reducerName: USER_REDUCER });
/**
 * Генерирует экшен для успешного получения информации о пользователе.
 * @function
 * @param {Object} info - Информация о пользователе.
 * @returns {Object} Экшен с типом "USER_INFO_SUCCESS".
 */
export const $userInfoSuccess = (info) => ({ type: USER_INFO_SUCCESS, payload: info, reducerName: USER_REDUCER });
/**
 * Генерирует экшен для обработки ошибки при получении информации о пользователе.
 * @function
 * @param {Object} error - Объект ошибки.
 * @returns {Object} Экшен с типом "USER_INFO_ERROR".
 */
export const $userInfoError = (error) => ({ type: USER_INFO_ERROR, payload: { isError: true, error: error }, reducerName: USER_REDUCER });
/**
 * Отправляет запрос на получение информации о пользователе.
 * @function
 * @returns {void}
 */
export const $sentUserInfoRequest = () => {
    store.dispatch($userInfoRequest());
    const id = localStorage.getItem('userId');
    getUserInfo(id)
        .then(response => {
            if (response) {
                localStorage.setItem('userInfo', response.body);
                store.dispatch($userInfoSuccess(response.body));
            }
        })
        .catch(error => {
            store.dispatch($userInfoError(error));
        });
};
