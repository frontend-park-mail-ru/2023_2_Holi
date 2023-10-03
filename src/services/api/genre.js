import { NETFLIX_API } from "./auth.js"

export const getGenreFilms = (genre) => {
    return fetch(`${NETFLIX_API}/films/genre/${genre}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: 'include'
    })
}
