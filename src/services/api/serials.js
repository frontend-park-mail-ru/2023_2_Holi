import { NETFLIX_API } from './const';
import {Page404} from "../../pages/404/404";

export const getGenreSerials = (id) => {
    return fetch(`${NETFLIX_API}/series/genre/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
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
        })
        .catch(error => {
            throw new Error(error);
        });
};

export const getSerialById = (id) => {
    return fetch(`${NETFLIX_API}/series/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
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
        })
        .catch(error => {
            throw new Error(error);
        });
};

export const getSerialByCastId = (id) => {
    return fetch(`${NETFLIX_API}/series/cast/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
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
        })
        .catch(error => {
            if (!navigator.onLine) {
                (new Page404(document.getElementById('root'))).render()
            }
            throw new Error(error);
        });
};

export const getGenreSerialAlias = () => {
    return fetch(`${NETFLIX_API}/genres/series`, {
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
            return data;
        })
        .catch(error => {
            if (!navigator.onLine) {
                (new Page404(document.getElementById('root'))).render()
            }
            throw new Error(error);
        });
};

export const getTopRatedSeries = () => {
    return fetch(`${NETFLIX_API}/series/top/rate`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
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
        })
        .catch(error => {
            throw new Error(error);
        });
};