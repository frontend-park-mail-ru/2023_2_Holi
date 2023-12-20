import store from '../../../..';
import { getSerialById } from '../../api/serials';
/**
 * Экшен типа "SERIALS_CONTENT_REQUEST".
 * @constant
 * @type {string}
 */
export const SERIALS_CONTENT_REQUEST = 'SERIALS_CONTENT_REQUEST';
/**
 * Экшен типа "SERIALS_CONTENT_SUCCESS".
 * @constant
 * @type {string}
 */
export const SERIALS_CONTENT_SUCCESS = 'SERIALS_CONTENT_SUCCESS';
/**
 * Экшен типа "SERIALS_CONTENT_ERROR".
 * @constant
 * @type {string}
 */
export const SERIALS_CONTENT_ERROR = 'SERIALS_CONTENT_ERROR';
/**
 * Генераторы экшенов для работы с контентом сериалов.
 */
export const SERIALS_CONTENT_REDUCER = 'SERIALS_CONTENT_REDUCER'; // Задайте имя вашего редьюсера
/**
 * Генерирует экшен для запроса контента сериала.
 * @function
 * @returns {Object} Экшен с типом "SERIALS_CONTENT_REQUEST".
 */
export const $serialsContentRequest = () => ({ type: SERIALS_CONTENT_REQUEST, reducerName: SERIALS_CONTENT_REDUCER });
/**
 * Генерирует экшен для успешного получения контента сериала.
 * @function
 * @param {Object} data - Данные контента сериала.
 * @returns {Object} Экшен с типом "SERIALS_CONTENT_SUCCESS".
 */
export const $serialsContentSuccess = (data) => ({ type: SERIALS_CONTENT_SUCCESS, payload: data, reducerName: SERIALS_CONTENT_REDUCER });
/**
 * Генерирует экшен для обработки ошибки при получении контента сериала.
 * @function
 * @param {Object} error - Объект ошибки.
 * @returns {Object} Экшен с типом "SERIALS_CONTENT_ERROR".
 */
export const $serialsContentError = (error) => ({ type: SERIALS_CONTENT_ERROR, payload: { isError: true, error: error }, reducerName: SERIALS_CONTENT_REDUCER });
/**
 * Отправляет запрос на получение контента сериала.
 * @function
 * @param {number} id - Идентификатор сериала.
 * @returns {void}
 */
export const $sendSerialsContentRequest = (id) => {
    store.dispatch($serialsContentRequest());
    getSerialById(id)
    .then(response => {
        if(response){
            store.dispatch($serialsContentSuccess(response.body));
        }
    })
    .catch(error => {
        store.dispatch($serialsContentError(error));
    });

};
