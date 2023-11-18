import { NETFLIX_API } from './const.js';

/**
 * Выполняет запрос на получение фильмов по указанному жанру.
 * @param {string} genre - Жанр фильмов, которые требуется получить.
 * @returns {Promise} Промис, который разрешится с данными о фильмах или ошибкой.
 * @throws {Error} Ошибка сети или некорректный ответ сервера.
 */
export const getGenreFilms = (genre) => {
    return fetch(`${NETFLIX_API}/films/genre/${genre}`, {
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

export const getContentById = (id) => {
    return fetch(`${NETFLIX_API}/films/${id}`, {
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

export const getContentByCastId = (id) => {
    return fetch(`${NETFLIX_API}/films/cast/${id}`, {
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

export const getGenreAlias = () => {
    return fetch(`${NETFLIX_API}/genres`, {
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
            throw new Error(error);
        });
};

export const getTopRated = () => {
    return fetch(`${NETFLIX_API}/films/top/rate`, {
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
