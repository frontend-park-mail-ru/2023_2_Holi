import { COLLECTION_REQUEST, COLLECTION_PREVIEW, COLLECTION_SUCCESS, COLLECTION_ERROR } from '../actions/collections';
/**
 * Начальное состояние редюсера коллекций.
 * @constant
 * @type {Object}
 * @property {boolean} collectionsRequest - Флаг, указывающий, происходит ли запрос коллекций.
 * @property {boolean} collectionsSuccess - Флаг успешного получения коллекций.
 * @property {boolean} collectionsError - Флаг ошибки при получении коллекций.
 * @property {null|Object} error - Объект ошибки.
 * @property {null|Object} collections - Коллекции.
 * @property {null|Object} preview - Превью коллекции.
 */
const initialState = {
    collectionsRequest: false,
    collectionsSuccess: false,
    collectionsError: false,
    error: null,
    collections: null,
    preview: null,
};
/**
 * Редюсер коллекций.
 * @function
 * @param {Object} state - Текущее состояние редюсера.
 * @param {Object} action - Действие, которое нужно применить к состоянию.
 * @returns {Object} Новое состояние редюсера.
 */
export const collectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case COLLECTION_REQUEST:
            return { ...state, collectionsRequest: true };
        case COLLECTION_SUCCESS:
            return { ...state, collectionsRequest: false, collections: action.payload, collectionsSuccess: true, collectionsError: false, error: null };
        case COLLECTION_PREVIEW:
            return { ...state, preview: action.payload };
        case COLLECTION_ERROR:
            return { ...state, collectionsRequest: false, collectionsSuccess: false, collectionsError: true };
        default:
            return state;
    }
};
