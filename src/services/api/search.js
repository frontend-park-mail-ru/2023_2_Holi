import { getCookie } from '../getCookie';
import { NETFLIX_API } from './const';

export const searchRequest = (value) => {
    return fetch(`${NETFLIX_API}/search/${value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-TOKEN': getCookie('csrf-token'),
        },
        credentials: 'include',
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    })
        .then(data => {
            return data;
        })
        .catch(error => {
            throw (error);
        });
};
