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
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password }),
    });
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
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password }),
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
    })
    .then(response => {
        if(response.ok){
            return response;
        } else{
            console.error('Ошибка проверки авторизации');

            return response;
        }
    });
};
