import { getCookie } from '../getCookie.js';
import { NETFLIX_AUTH_API } from './const.js';
import { Notify } from '../../components/notify/notify.js';

/**
 * Выполняет запрос на вход пользователя.
 *
 * @param {string} email - Электронная почта пользователя.
 * @param {string} password - Пароль пользователя.
 * @returns {Promise<Response>} Promise, который разрешится с ответом от сервера.
 * @throws {Error} Если запрос не успешен, бросает ошибку с текстом ответа.
 */
export const loginRequest = (email, password) => {
    if (!navigator.onLine) {
        new Notify('Нет соединения');
    }

    return fetch(`${NETFLIX_AUTH_API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-TOKEN': getCookie('csrf-token'),
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password }),
    }).then(response => {

        if (response.ok) {
            localStorage.setItem('authData', true);

            return response.json();
        } else {
            // Если статус не успешен, выбросьте ошибку с текстом ответа
            return response.text().then(errorText => {
                throw new Error(`Ошибка запроса: ${errorText}`);
            });
        }

    })
        .then(data => {
            return data;
        })
        .catch(error => {
            throw error;
        });
};
/**
 * Инициализирует CSRF-токен.
 *
 * @returns {Promise<Response>} Promise, который разрешится с ответом от сервера.
 */
export const csrfInit = () => {
    return fetch(`${NETFLIX_AUTH_API}/csrf`, {
        method: 'GET',
        credentials: 'include',
    })

        .then(response => {

            return response;
        });
};

/**
 * Выполняет запрос на регистрацию пользователя.
 *
 * @param {string} email - Электронная почта пользователя.
 * @param {string} password - Пароль пользователя.
 * @returns {Promise<Response>} Promise, который разрешится с ответом от сервера.
 * @throws {Error} Если запрос не успешен.
 */
export const registerRequest = (email, password) => {
    if (!navigator.onLine) {
        new Notify('Нет соединения');
    }

    return fetch(`${NETFLIX_AUTH_API}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-TOKEN': getCookie('csrf-token'),
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password }),
    }).then(response => {
        localStorage.setItem('authData', true);

        return response;
    });
};

/**
* Выполняет запрос на выход пользователя.
*
* @returns {Promise<Response>} Promise, который разрешится с ответом от сервера.
* @throws {Error} Если запрос не успешен.
*/
export const logoutRequest = () => {
    if (!navigator.onLine) {
        new Notify('Нет соединения');
    }

    return fetch(`${NETFLIX_AUTH_API}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf-token'),
        },
    }).then(response => {
        localStorage.setItem('authData', false);

        return response;
    });
};

/**
 * Проверяет доступ пользователя.
 *
 * @returns {Promise<Response>} Promise, который разрешится с ответом от сервера.
 */
export const checkAccess = () => {
    return fetch(`${NETFLIX_AUTH_API}/auth/check`, {
        method: 'POST',
        credentials: 'include',

        headers: {
            'X-CSRF-TOKEN': getCookie('csrf-token'),
        },
    })
        .then(response => {
            return response;
        });
};

