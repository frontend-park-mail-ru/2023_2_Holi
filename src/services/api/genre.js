import { NETFLIX_API } from './auth.js';

export const getGenreFilms = (genre) => {
    return fetch(`${NETFLIX_API}/films/genre/${genre}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json(); // Возвращает промис с объектом JSON
        })
        .then(data => {
            // Здесь можно обрабатывать полученные данные в виде объекта JSON
            return data; // Возвращаем объект JSON
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
};
