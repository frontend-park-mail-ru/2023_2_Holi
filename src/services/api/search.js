import { getCookie } from '../getCookie';
import { NETFLIX_API } from './const';
/**
 * Выполняет запрос на поиск по названию видео.
 * @param {string} value - Значение для поиска.
 * @returns {Promise} Промис, который разрешится с данными о результатах поиска или ошибкой.
 * @throws {Error} Ошибка сети или некорректный ответ сервера.
 */
export const searchRequest = (value) => {
    return fetch(`${NETFLIX_API}/search/${value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-TOKEN': getCookie('csrf-token'),
        },
        credentials: 'include',
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    })
        .then(data => {
            return data;
        })
        .catch(error => {
            throw (error);
        });
};
