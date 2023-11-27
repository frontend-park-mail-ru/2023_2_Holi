import store from '../../../..';
import { getGenreAlias, getGenreFilms, getTopRated } from '../../api/content';
export const COLLECTION_REQUEST = 'COLLECTION_REQUEST';
export const COLLECTION_SUCCESS = 'COLLECTION_SUCCESS';
export const COLLECTION_ERROR = 'COLLECTION_ERROR';

export const COLLECTION_PREVIEW = 'COLLECTION_PREVIEW';
/**
 * Генераторы экшенов
 */

export const COLLECTION_REDUCER = 'COLLECTION_REDUCER'; // Задайте имя вашего редьюсера

export const $collectionRequest = () => ({ type: COLLECTION_REQUEST, reducerName: COLLECTION_REDUCER });

export const $collectionSuccess = (data) => ({ type: COLLECTION_SUCCESS, payload: data, reducerName: COLLECTION_REDUCER });

export const $collectionError = (error) => ({ type: COLLECTION_ERROR, payload: { isError: true, error: error }, reducerName: COLLECTION_REDUCER });

export const $collectionPreview = (preview) => ({ type: COLLECTION_PREVIEW, payload: preview, reducerName: COLLECTION_REDUCER });

export const $sendCollectionAliasRequest = () => {
    store.dispatch($collectionRequest());
    getGenreAlias()
        .then(response => {
            const genres = response.body.genres;
            console.info(genres);
            const genrePromises = genres.map(genre => {
                return getGenreFilms(genre.name)
                    .then(result => {
                        if (result.body.films) {
                            return ({
                                name: genre.name,
                                content: result.body.films,
                            });
                        }
                    })
                    .catch(error => {
                        $collectionError(error);
                    });
            });

            return Promise.all(genrePromises);
        })
        .then(data => {
            console.info(data);
            store.dispatch($collectionSuccess(data));
            getTopRated()
                .then(retult => {
                    store.dispatch($collectionPreview(retult.body.film));
                });
        });

};
