import store from '../../../..';
import { getGenreAlias, getGenreFilms, getTopRated } from '../../api/content';

/**
 * Экшен типа "COLLECTION_REQUEST".
 * @constant
 * @type {string}
 */
export const COLLECTION_REQUEST = 'COLLECTION_REQUEST';

/**
 * Экшен типа "COLLECTION_SUCCESS".
 * @constant
 * @type {string}
 */
export const COLLECTION_SUCCESS = 'COLLECTION_SUCCESS';

/**
 * Экшен типа "COLLECTION_ERROR".
 * @constant
 * @type {string}
 */
export const COLLECTION_ERROR = 'COLLECTION_ERROR';

/**
 * Экшен типа "COLLECTION_PREVIEW".
 * @constant
 * @type {string}
 */
export const COLLECTION_PREVIEW = 'COLLECTION_PREVIEW';

/**
 * Имя редьюсера для обработки экшенов, связанных с коллекциями.
 * @constant
 * @type {string}
 */
export const COLLECTION_REDUCER = 'COLLECTION_REDUCER'; // Задайте имя вашего редьюсера
/**
 * Генерирует экшен запроса коллекции.
 * @function
 * @returns {Object} Экшен с типом "COLLECTION_REQUEST".
 */
export const $collectionRequest = () => ({ type: COLLECTION_REQUEST, reducerName: COLLECTION_REDUCER });
/**
 * Генерирует экшен успешного получения коллекции.
 * @function
 * @param {Object} data - Данные коллекции.
 * @returns {Object} Экшен с типом "COLLECTION_SUCCESS".
 */
export const $collectionSuccess = (data) => ({ type: COLLECTION_SUCCESS, payload: data, reducerName: COLLECTION_REDUCER });
/**
 * Генерирует экшен ошибки получения коллекции.
 * @function
 * @param {Error} error - Объект ошибки.
 * @returns {Object} Экшен с типом "COLLECTION_ERROR".
 */
export const $collectionError = (error) => ({ type: COLLECTION_ERROR, payload: { isError: true, error: error }, reducerName: COLLECTION_REDUCER });
/**
 * Генерирует экшен для предпросмотра коллекции.
 * @function
 * @param {Object} preview - Предпросмотр коллекции.
 * @returns {Object} Экшен с типом "COLLECTION_PREVIEW".
 */
export const $collectionPreview = (preview) => ({ type: COLLECTION_PREVIEW, payload: preview, reducerName: COLLECTION_REDUCER });
/**
 * Отправляет запрос на получение коллекции.
 * @function
 * @returns {void}
 */
export const $sendCollectionAliasRequest = () => {
    store.dispatch($collectionRequest());
    getGenreAlias()
        .then(response => {
            const genres = response.body.genres;
            const genrePromises = genres.map(genre => {
                return getGenreFilms(genre.id)
                    .then(result => {
                        if (result.body.films) {
                            return ({
                                name: genre.name,
                                id: genre.id,
                                content: result.body.films,
                            });
                        }
                    });
                    // .catch(error => {
                    //     $collectionError(error);
                    // });
            });

            // eslint-disable-next-line no-undef
            return Promise.all(genrePromises);
        })
        .then(data => {
            store.dispatch($collectionSuccess(data));
            getTopRated()
                .then(retult => {
                    store.dispatch($collectionPreview(retult.body.film));
                });
        });

};
