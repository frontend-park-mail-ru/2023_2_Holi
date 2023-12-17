import { getCookie } from '../getCookie';
import { NETFLIX_API } from './const';
import { Page404 } from '../../pages/404/404';
import { Notify } from '../../components/notify/notify';

export const setRatingRequest = (rate, id) => {
    if (!navigator.onLine) {
        new Notify('Нет соединения');
    }

    return fetch(`${NETFLIX_API}/video/rating`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-TOKEN': getCookie('csrf-token'),
        },
        body: JSON.stringify({ rate: Number(rate), videoId: Number(id) }),
        credentials: 'include',
    }).then(response => {
        if (response.ok) {
            return response;
        }
    });

};

export const getRating = (id) => {
    return fetch(`${NETFLIX_API}/video/rating/check/${id}`, {
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
            (new Page404(document.getElementById('root'))).render();
            throw (error);
        });
};

export const deleteRating = (id) => {
    if (!navigator.onLine) {
        new Notify('Нет соединения');
    }

    return fetch(`${NETFLIX_API}/video/rating/${id}`, {
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
