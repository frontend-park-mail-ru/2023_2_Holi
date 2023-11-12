import { getCookie } from '../getCookie.js';
import { NETFLIX_API } from './const.js';
import {Notify} from "../../components/notify/notify.js";

/**
 * Выполняет запрос на вход пользователя.
 * @param {string} email - Электронная почта пользователя.
 * @param {string} password - Пароль пользователя.
 * @returns {Promise<Response>} Объект Promise, который разрешится с ответом от сервера.
 */
export const loginRequest = (email, password) => {
    if (!navigator.onLine) {
        new Notify("Нет соединения")
    }
    return fetch(`${NETFLIX_API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-TOKEN': getCookie('csrf-token'),
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
            console.log(response);
            return response;
        });
};

/**
 * Выполняет запрос на регистрацию пользователя.
 * @param {string} email - Электронная почта пользователя.
 * @param {string} password - Пароль пользователя.
 * @returns {Promise<Response>} Объект Promise, который разрешится с ответом от сервера.
 */
export const registerRequest = (email, password) => {
    if (!navigator.onLine) {
        new Notify("Нет соединения")
    }
    return fetch(`${NETFLIX_API}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-TOKEN': getCookie('csrf-token'),
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
    if (!navigator.onLine) {
        new Notify("Нет соединения")
    }
    return fetch(`${NETFLIX_API}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf-token'),
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
            'X-CSRF-TOKEN': getCookie('csrf-token'),
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

