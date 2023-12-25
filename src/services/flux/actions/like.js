import store from '../../../..';
import { getLike } from '../../api/like';
/**
 * Экшен типа "GET_FAVOURITES".
 * @constant
 * @type {string}
 */
export const GET_FAVOURITES = 'GET_FAVOURITES';
/**
 * Генерирует экшен для получения избранных элементов.
 * @function
 * @param {Object} data - Данные избранных элементов.
 * @returns {Object} Экшен с типом "GET_FAVOURITES".
 */
export const $getFavourites = (data) => ({ type: GET_FAVOURITES, payload: data, reducerName: 'FAVOURITES_REDUCER' });
/**
 * Отправляет запрос на получение избранных элементов.
 * @function
 * @returns {void}
 */
export const $sendGetFavourites = () => {
    getLike()
        .then(response => {
            store.dispatch($getFavourites(response.body));
        });
};
