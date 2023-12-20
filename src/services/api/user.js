import { NETFLIX_API } from './const.js';
import { getCookie } from '../getCookie.js';
import { Notify } from '../../components/notify/notify.js';
/**
 * Выполняет запрос на получение информации о пользователе.
 * @param {string} id - Идентификатор пользователя.
 * @returns {Promise} Промис, который разрешится с данными о пользователе или ошибкой.
 * @throws {Error} Ошибка сети или некорректный ответ сервера.
 */
export const getUserInfo = (id) => {
    return fetch(`${NETFLIX_API}/profile/${id}`, {
        method: 'GET', headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }, credentials: 'include',
    }).then(response => {
        if (!response.ok) {
            throw new Error('Ответ сервера не 200');
        }

        return response.json();
    })
        .then(data => {

            return data;
        })
        .catch(error => {
            throw new Error(error);
        });
};
/**
 * Выполняет запрос на обновление информации о пользователе.
 * @param {object} data - Объект с обновленными данными пользователя.
 * @returns {Promise} Промис, который разрешится с результатом запроса или ошибкой.
 * @throws {Error} Ошибка сети или некорректный ответ сервера.
 */
export const setUserInfo = (data) => {
    if (!navigator.onLine) {
        new Notify('Нет соединения');
    }

    return fetch(`${NETFLIX_API}/profile/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-TOKEN': getCookie('csrf-token'),
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
};
