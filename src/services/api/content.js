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
            console.error('Возникли проблемы с запросом:', error);
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
            console.error('Возникли проблемы с запросом:', error);
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
            console.error('Возникли проблемы с запросом:', error);
            return {
                "name": "Henry Cavill",
                "films": [
                    {
                        "id": 1,
                        "name": "name",
                        "rating": 7.8,
                        "previewPath": "https://fs.kinomania.ru/image/file/film_poster/c/36/c36d4557f6955b864e70fd55a02505f1.228.313.jpeg"
                    },
                    {
                        "id": 1,
                        "name": "name",
                        "rating": 7.8,
                        "previewPath": "https://fs.kinomania.ru/image/file/film_poster/c/36/c36d4557f6955b864e70fd55a02505f1.228.313.jpeg"
                    },
                    {
                        "id": 1,
                        "name": "name",
                        "rating": 7.8,
                        "previewPath": "https://fs.kinomania.ru/image/file/film_poster/c/36/c36d4557f6955b864e70fd55a02505f1.228.313.jpeg"
                    },
                    {
                        "id": 1,
                        "name": "name",
                        "rating": 7.8,
                        "previewPath": "https://fs.kinomania.ru/image/file/film_poster/c/36/c36d4557f6955b864e70fd55a02505f1.228.313.jpeg"
                    },
                    {
                        "id": 1,
                        "name": "name",
                        "rating": 7.8,
                        "previewPath": "https://fs.kinomania.ru/image/file/film_poster/c/36/c36d4557f6955b864e70fd55a02505f1.228.313.jpeg"
                    },
                    {
                        "id": 1,
                        "name": "name",
                        "rating": 7.8,
                        "previewPath": "https://fs.kinomania.ru/image/file/film_poster/c/36/c36d4557f6955b864e70fd55a02505f1.228.313.jpeg"
                    },
                    {
                        "id": 1,
                        "name": "name",
                        "rating": 7.8,
                        "previewPath": "https://fs.kinomania.ru/image/file/film_poster/c/36/c36d4557f6955b864e70fd55a02505f1.228.313.jpeg"
                    },
                    {
                        "id": 1,
                        "name": "name",
                        "rating": 7.8,
                        "previewPath": "https://fs.kinomania.ru/image/file/film_poster/c/36/c36d4557f6955b864e70fd55a02505f1.228.313.jpeg"
                    },
                ]
            }
        });
};
