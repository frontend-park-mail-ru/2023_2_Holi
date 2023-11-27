import { getCookie } from '../getCookie';
import { NETFLIX_API } from './const';

export const setLike = (id) => {
    return fetch(`${NETFLIX_API}/video/favourites/${id}`, {
        method: 'POST',
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
        });
};

export const getLike = () => {
    return fetch(`${NETFLIX_API}/video/favourites`, {
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

export const deleteLike = (id) => {
    return fetch(`${NETFLIX_API}/video/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-TOKEN': getCookie('csrf-token'),
        },
        credentials: 'include',
    }).then(response => {
        return response;
    });
};
