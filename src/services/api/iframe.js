import { NETFLIX_API } from './const';

export const getStateSurvey = () => {
    return fetch(`${NETFLIX_API}/survey/stat`, {
        method: 'GET', headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }, credentials: 'include',
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
            throw new Error(error);
        });
};

export const getStateSurveyMock = () => {
    return {
        body:
            [{
                name: 'csi/profile', value: [
                    { key: 1, value: 20 },
                    { key: 2, value: 20 },
                    { key: 3, value: 20 },
                    { key: 4, value: 20 },
                    { key: 5, value: 20 },
                    { key: 'mediana', value: 3.44 },
                ],
            },
            {
                name: 'csi/feed', value: [
                    { key: 1, value: 20 },
                    { key: 2, value: 20 },
                    { key: 3, value: 20 },
                    { key: 4, value: 20 },
                    { key: 5, value: 20 },
                    { key: 'mediana', value: 3.44 },
                ],
            },
            {
                name: 'nps', value: [
                    { key: 1, value: 20 },
                    { key: 2, value: 20 },
                    { key: 3, value: 20 },
                    { key: 4, value: 20 },
                    { key: 5, value: 20 },
                    { key: 6, value: 20 },
                    { key: 7, value: 20 },
                    { key: 8, value: 20 },
                    { key: 9, value: 20 },
                    { key: 10, value: 20 },
                    { key: 'mediana', value: 6.44 },
                ],
            }],
    };
};

export const getCheckSurvey = (key) => {
    return fetch(`${NETFLIX_API}/survey/add/${key}`, {
        method: 'GET', headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }, credentials: 'include',
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
            throw new Error(error);
        });
};
