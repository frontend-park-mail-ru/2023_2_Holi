import store from '../../../..';
import { getUserInfo } from '../../api/user';
export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_ERROR = 'USER_INFO_ERROR';

/**
 * Генераторы экшенов
 */
export const $userInfoRequest = () => ({ type: USER_INFO_REQUEST });

export const $userInfoSuccess = (info) => ({ type: USER_INFO_SUCCESS, payload:  info });

export const $userInfoError = (error) => ({ type: USER_INFO_ERROR, payload: { isError: true, error: error } });

export const $sentUserInfoRequest = () => {
    store.dispatch($userInfoRequest());
    const id = localStorage.getItem('userId');
    getUserInfo(id)
        .then(response => {
            if (response) {
                localStorage.setItem('userInfo', response.body);
                store.dispatch($userInfoSuccess(response.body));
            }
        })
        .catch(error => {
            store.dispatch($userInfoError(error));
        });
};
