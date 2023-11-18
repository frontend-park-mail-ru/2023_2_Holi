import { NETFLIX_API } from './const.js';
import EventEmitter from '../store.js';
import { getCookie } from '../getCookie.js';
import { Notify } from '../../components/notify/notify.js';

export const getUserInfo = (id) => {
    return fetch(`${NETFLIX_API}/profile/${id}`, {
        method: 'GET', headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }, credentials: 'include',
    }).then(response => {
        if (!response.ok) {
            throw new Error('Ответ сервера не 200');
        }

        return response.json();
    })
        .then(data => {
            EventEmitter.emit('getUserData', data);
            EventEmitter.setState('getUserData', data);

            return data;
        })
        .catch(error => {
            throw new Error(error);
        });
};

export const setUserInfo = (data) => {
    if (!navigator.onLine) {
        new Notify('Нет соединения');
    }

    return fetch(`${NETFLIX_API}/profile/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-TOKEN': getCookie('csrf-token'),
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
};
