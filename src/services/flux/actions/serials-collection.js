import store from '../../../..';
import { getGenreSerialAlias, getTopRatedSeries } from '../../api/serials';
import { getGenreSerials } from '../../api/serials';
/**
 * Экшен типа "SERIALS_COLLECTION_REQUEST".
 * @constant
 * @type {string}
 */
export const SERIALS_COLLECTION_REQUEST = 'SERIALS_COLLECTION_REQUEST';
/**
 * Экшен типа "SERIALS_COLLECTION_SUCCESS".
 * @constant
 * @type {string}
 */
export const SERIALS_COLLECTION_SUCCESS = 'SERIALS_COLLECTION_SUCCESS';
/**
 * Экшен типа "SERIALS_COLLECTION_ERROR".
 * @constant
 * @type {string}
 */
export const SERIALS_COLLECTION_ERROR = 'SERIALS_COLLECTION_ERROR';
/**
 * Экшен типа "SERIALS_COLLECTION_PREVIEW".
 * @constant
 * @type {string}
 */
export const SERIALS_COLLECTION_PREVIEW = 'SERIALS_COLLECTION_PREVIEW';
/**
 * Генераторы экшенов
 */

export const SERIALS_COLLECTION_REDUCER = 'SERIALS_COLLECTION_REDUCER'; // Задайте имя вашего редьюсера
/**
 * Генерирует экшен для запроса коллекции сериалов.
 * @function
 * @returns {Object} Экшен с типом "SERIALS_COLLECTION_REQUEST".
 */
export const $serialsCollectionRequest = () => ({ type: SERIALS_COLLECTION_REQUEST, reducerName: SERIALS_COLLECTION_REDUCER });
/**
 * Генерирует экшен для успешного получения коллекции сериалов.
 * @function
 * @param {Object} data - Данные коллекции сериалов.
 * @returns {Object} Экшен с типом "SERIALS_COLLECTION_SUCCESS".
 */
export const $serialsCollectionSuccess = (data) => ({ type: SERIALS_COLLECTION_SUCCESS, payload: data, reducerName: SERIALS_COLLECTION_REDUCER });
/**
 * Генерирует экшен для обработки ошибки при получении коллекции сериалов.
 * @function
 * @param {Object} error - Объект ошибки.
 * @returns {Object} Экшен с типом "SERIALS_COLLECTION_ERROR".
 */
export const $serialsCollectionError = (error) => ({ type: SERIALS_COLLECTION_ERROR, payload: { isError: true, error: error }, reducerName: SERIALS_COLLECTION_REDUCER });
/**
 * Генерирует экшен для предварительного просмотра коллекции сериалов.
 * @function
 * @param {Object} preview - Данные предварительного просмотра коллекции сериалов.
 * @returns {Object} Экшен с типом "SERIALS_COLLECTION_PREVIEW".
 */
export const $serialsCollectionPreview = (preview) => ({ type: SERIALS_COLLECTION_PREVIEW, payload: preview, reducerName: SERIALS_COLLECTION_REDUCER });
/**
 * Отправляет запрос на получение коллекции сериалов.
 * @function
 * @returns {void}
 */
export const $sendSerialsCollectionAliasRequest = () => {
    store.dispatch($serialsCollectionRequest());
    getGenreSerialAlias()
        .then(response => {
            const genres = response.body.genres;
            const genrePromises = genres.map(genre => {
                return getGenreSerials(genre.id)
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

            // eslint-disable-next-line no-undef
            return Promise.all(genrePromises);
        })
        .then(data => {
            store.dispatch($serialsCollectionSuccess(data));
            getTopRatedSeries()
                .then(retult => {
                    store.dispatch($serialsCollectionPreview(retult.body.series));
                });
        });

};
