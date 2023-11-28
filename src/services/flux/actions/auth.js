import { loginRequest } from '../../api/auth';
import store from '../../../..';

export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_ERROR = 'GET_LOGIN_ERROR';

/**
 * Генераторы экшенов
 */
export const $loginRequest = () => ({ type: GET_LOGIN_REQUEST });

export const $loginSuccess = (userId) => ({ type: GET_LOGIN_SUCCESS, payload: { isAuth: true, userId: userId } });

export const $loginError = (error) => ({ type: GET_LOGIN_ERROR, payload: { isError: true, error: error } });

export const $sentAuthRequest = (email, password, goToFeed) => {
    store.dispatch($loginRequest());
    loginRequest(email, password)
        .then(response => {
            if (response) {
                localStorage.setItem('userId', response.body.id);
                localStorage.setItem('authData', true);
                store.dispatch($loginSuccess(response.body.id));
                goToFeed();
            }
        })
        .catch(error => {
            store.dispatch($loginError(error));
        });
};
