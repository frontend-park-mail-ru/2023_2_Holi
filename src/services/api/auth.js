export const NETFLIX_API = 'http://localhost:8080/api/v1'
export const loginRequest = (name, password) => {
    return fetch(`${NETFLIX_API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({name: name, password: password})
    })
}