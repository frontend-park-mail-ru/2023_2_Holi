import { NETFLIX_AUTH_API } from './const';

export const getPaymentLink = () => {
    const id = localStorage.getItem('userId');

    return fetch(`${NETFLIX_AUTH_API}/subs/pay/${id}`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ответ сервера не 200');
            }

            return response.json();
        })
        .then(data => {
            return data;
        });

};

export const checkPaymentLink = () => {
    const id = localStorage.getItem('userId');

    return fetch(`${NETFLIX_AUTH_API}/subs/check/${id}`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ответ сервера не 200');
            }

            return response.json();
        })
        .then(data => {
            return data;
        });

};
