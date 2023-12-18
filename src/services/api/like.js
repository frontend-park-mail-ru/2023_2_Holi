import { getCookie } from '../getCookie';
import { NETFLIX_API } from './const';
import { Page404 } from '../../pages/404/404';
import { Notify } from '../../components/notify/notify';
/**
 * Выполняет запрос на установку лайка для видео.
 * @param {string} id - Идентификатор видео.
 * @returns {Promise} Промис, который разрешится с ответом от сервера или ошибкой.
 * @throws {Error} Ошибка сети или некорректный ответ сервера.
 */
export const setLike = (id) => {
    if (!navigator.onLine) {
        new Notify('Нет соединения');
    }

    return fetch(`${NETFLIX_API}/video/favourites/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-TOKEN': getCookie('csrf-token'),
        },
        credentials: 'include',
    }).then(response => {
        if (response.ok) {
            return response;
        }
    });

};
/**
 * Выполняет запрос на получение списка лайкнутых видео.
 * @returns {Promise} Промис, который разрешится с данными о лайкнутых видео или ошибкой.
 * @throws {Error} Ошибка сети или некорректный ответ сервера.
 */
export const getLike = () => {
    return fetch(`${NETFLIX_API}/video/favourites`, {
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
            (new Page404(document.getElementById('root'))).render();
            throw (error);
        });
};
/**
 * Выполняет запрос на получение состояния лайка для конкретного видео.
 * @param {string} id - Идентификатор видео.
 * @returns {Promise} Промис, который разрешится с данными о состоянии лайка или ошибкой.
 * @throws {Error} Ошибка сети или некорректный ответ сервера.
 */
export const getLikeState = (id) => {
    return fetch(`${NETFLIX_API}/video/favourites/check/${id}`, {
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
            (new Page404(document.getElementById('root'))).render();
            throw (error);
        });
};
/**
 * Выполняет запрос на удаление лайка для видео.
 * @param {string} id - Идентификатор видео.
 * @returns {Promise} Промис, который разрешится с ответом от сервера или ошибкой.
 * @throws {Error} Ошибка сети или некорректный ответ сервера.
 */
export const deleteLike = (id) => {
    if (!navigator.onLine) {
        new Notify('Нет соединения');
    }

    return fetch(`${NETFLIX_API}/video/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-TOKEN': getCookie('csrf-token'),
        },
        credentials: 'include',
    }).then(response => {
        return response;
    });
};
