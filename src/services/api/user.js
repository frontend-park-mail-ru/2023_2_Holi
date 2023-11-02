import { NETFLIX_API } from './const.js';
import EventEmitter from '../store.js';
export const getUserInfo = (id) => {
    return fetch(`${NETFLIX_API}/profile/${id}`, {
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
            EventEmitter.emit('getUserData', data);
            EventEmitter.setState('getUserData', data);

            return data;
        })
        .catch(error => {
            console.error('Возникли проблемы с запросом:', error);
        });
};

export const setUserInfo = (id, name, email, password, file) => {
    return fetch(`${NETFLIX_API}/profile/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify({
            id: id,
            name: name,
            email: email,
            password: password,
            imageData: file,
        }),
    });
};
