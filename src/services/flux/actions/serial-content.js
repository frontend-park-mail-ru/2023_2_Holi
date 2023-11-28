import store from '../../../..';
import { getSerialById } from '../../api/serials';
export const SERIALS_CONTENT_REQUEST = 'SERIALS_CONTENT_REQUEST';
export const SERIALS_CONTENT_SUCCESS = 'SERIALS_CONTENT_SUCCESS';
export const SERIALS_CONTENT_ERROR = 'SERIALS_CONTENT_ERROR';
/**
 * Генераторы экшенов
 */

export const SERIALS_CONTENT_REDUCER = 'SERIALS_CONTENT_REDUCER'; // Задайте имя вашего редьюсера

export const $serialsContentRequest = () => ({ type: SERIALS_CONTENT_REQUEST, reducerName: SERIALS_CONTENT_REDUCER });

export const $serialsContentSuccess = (data) => ({ type: SERIALS_CONTENT_SUCCESS, payload: data, reducerName: SERIALS_CONTENT_REDUCER });

export const $serialsContentError = (error) => ({ type: SERIALS_CONTENT_ERROR, payload: { isError: true, error: error }, reducerName: SERIALS_CONTENT_REDUCER });

export const $sendSerialsContentRequest = (id) => {
    store.dispatch($serialsContentRequest());
    getSerialById(id)
    .then(response => {
        if(response){
            store.dispatch($serialsContentSuccess(response.body));
        }
    })
    .catch(error => {
        store.dispatch($serialsContentError(error));
    });

};
