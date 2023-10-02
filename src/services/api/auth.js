export const NETFLIX_API = 'http://84.23.54.38:8080/api/v1'


export const loginRequest = (name, password) => {
    return fetch(`${NETFLIX_API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ name: name, password: password })
    })
}

export const registerRequest = (email, password) => {
    return fetch(`${NETFLIX_API}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ name: email, password: password })
    })
}