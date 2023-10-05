export const NETFLIX_API = 'http://84.23.54.38:8080/api/v1';
// export const NETFLIX_API = 'http://localhost:8080/api/v1'

export const loginRequest = (email, password) => {
    return fetch(`${NETFLIX_API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password }),
    });
};

export const registerRequest = (email, password) => {
    return fetch(`${NETFLIX_API}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password }),
    });
};

export const logoutRequest = () => {
    return fetch(`${NETFLIX_API}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });
};

export const checkAccess = () => {
    return fetch(`${NETFLIX_API}/auth/check`, {
        method: 'POST',
        credentials: 'include',
    });
};
