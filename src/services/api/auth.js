import { getCookie } from '../getCookie.js';
import { NETFLIX_API } from './const.js';

/**
 * Выполняет запрос на вход пользователя.
 * @param {string} email - Электронная почта пользователя.
 * @param {string} password - Пароль пользователя.
 * @returns {Promise<Response>} Объект Promise, который разрешится с ответом от сервера.
 */
export const loginRequest = (email, password) => {
    return fetch(`${NETFLIX_API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-TOKEN': getCookie('_gorilla_csrf'), // CSRF-токен из кук
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password }),
    }).then(response => {
        return response;
    });
};

export const csrfInit = () => {
    return fetch(`${NETFLIX_API}/csrf`, {
         method: 'GET',
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ответ сервера не 200');
            }

            return response.json();
        })
};

/**
 * Выполняет запрос на регистрацию пользователя.
 * @param {string} email - Электронная почта пользователя.
 * @param {string} password - Пароль пользователя.
 * @returns {Promise<Response>} Объект Promise, который разрешится с ответом от сервера.
 */
export const registerRequest = (email, password) => {
    return fetch(`${NETFLIX_API}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-TOKEN': getCookie('_gorilla_csrf'),
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password }),
    }).then(response => {
        return response;
    });
};

/**
 * Выполняет запрос на выход пользователя.
 * @returns {Promise<Response>} Объект Promise, который разрешится с ответом от сервера.
 */
export const logoutRequest = () => {
    return fetch(`${NETFLIX_API}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'X-CSRF-TOKEN': getCookie('_gorilla_csrf'),
        },
    }).then(response => {
        return response;
    });
};

/**
 * Выполняет проверку доступа пользователя.
 * @returns {Promise<Response>} Объект Promise, который разрешится с ответом от сервера.
 */
export const checkAccess = () => {
    return fetch(`${NETFLIX_API}/auth/check`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf'),
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                console.error('Ошибка проверки авторизации');

                return response;
            }
        });
};

