import store from '../../../..';
import { getGenreAlias } from '../../api/content';
import { getGenreSerials } from '../../api/serials';
export const SERIALS_COLLECTION_REQUEST = 'SERIALS_COLLECTION_REQUEST';
export const SERIALS_COLLECTION_SUCCESS = 'SERIALS_COLLECTION_SUCCESS';
export const SERIALS_COLLECTION_ERROR = 'SERIALS_COLLECTION_ERROR';
/**
 * Генераторы экшенов
 */

export const SERIALS_COLLECTION_REDUCER = 'SERIALS_COLLECTION_REDUCER'; // Задайте имя вашего редьюсера

export const $serialsCollectionRequest = () => ({ type: SERIALS_COLLECTION_REQUEST, reducerName: SERIALS_COLLECTION_REDUCER });

export const $serialsCollectionSuccess = (data) => ({ type: SERIALS_COLLECTION_SUCCESS, payload: data, reducerName: SERIALS_COLLECTION_REDUCER });

export const $serialsCollectionError = (error) => ({ type: SERIALS_COLLECTION_ERROR, payload: { isError: true, error: error }, reducerName: SERIALS_COLLECTION_REDUCER });

export const $sendSerialsCollectionAliasRequest = () => {
    store.dispatch($serialsCollectionRequest());
    getGenreAlias()
        .then(response => {
            const genres = response.body.genres;
            const genrePromises = genres.map(genre => {
                return getGenreSerials(genre.name)
                    .then(result => {
                        if (result.body.films) {
                            return ({
                                name: genre.name,
                                id: genre.id,
                                content: result.body.films,
                            });
                        }
                    })
                    .catch(error => {
                        $serialsCollectionError(error);
                    });
            });

            return Promise.all(genrePromises);
        })
        .then(data => {
            store.dispatch($serialsCollectionSuccess(data));
        });

};
