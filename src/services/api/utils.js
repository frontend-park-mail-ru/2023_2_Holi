export const checkResponse = (response) => {
    return response.ok ? response.json() : Promise.reject(response.status)
}