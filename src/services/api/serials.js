import { NETFLIX_API } from './const';
import {Page404} from '../../pages/404/404';
/**
 * Выполняет запрос на получение сериалов по указанному жанру.
 * @param {string} id - Идентификатор жанра.
 * @returns {Promise} Промис, который разрешится с данными о сериалах или ошибкой.
 * @throws {Error} Ошибка сети или некорректный ответ сервера.
 */
export const getGenreSerials = (id) => {
    return fetch(`${NETFLIX_API}/series/genre/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        credentials: 'include',
    })
        .then(response => {
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
 * Выполняет запрос на получение информации о сериале по его идентификатору.
 * @param {string} id - Идентификатор сериала.
 * @returns {Promise} Промис, который разрешится с данными о сериале или ошибкой.
 * @throws {Error} Ошибка сети или некорректный ответ сервера.
 */
export const getSerialById = (id) => {
    return fetch(`${NETFLIX_API}/series/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        credentials: 'include',
    })
        .then(response => {
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
 * Выполняет запрос на получение сериалов по идентификатору актера.
 * @param {string} id - Идентификатор актера.
 * @returns {Promise} Промис, который разрешится с данными о сериалах или ошибкой.
 * @throws {Error} Ошибка сети или некорректный ответ сервера.
 */
export const getSerialByCastId = (id) => {
    return fetch(`${NETFLIX_API}/series/cast/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ответ сервера не 200');
            }

            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            if (!navigator.onLine) {
                (new Page404(document.getElementById('root'))).render();
            }
            throw new Error(error);
        });
};
/**
 * Выполняет запрос на получение жанров сериалов.
 * @returns {Promise} Промис, который разрешится с данными о жанрах или ошибкой.
 * @throws {Error} Ошибка сети или некорректный ответ сервера.
 */
export const getGenreSerialAlias = () => {
    return fetch(`${NETFLIX_API}/genres/series`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        credentials: 'include',
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
            if (!navigator.onLine) {
                (new Page404(document.getElementById('root'))).render();
            }
            throw new Error(error);
        });
};
/**
 * Выполняет запрос на получение топовых сериалов.
 * @returns {Promise} Промис, который разрешится с данными о топовых сериалах или ошибкой.
 * @throws {Error} Ошибка сети или некорректный ответ сервера.
 */
export const getTopRatedSeries = () => {
    return fetch(`${NETFLIX_API}/series/top/rate`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        credentials: 'include',
    })
        .then(response => {
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
