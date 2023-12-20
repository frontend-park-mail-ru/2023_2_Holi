import { SERIALS_COLLECTION_REQUEST, SERIALS_COLLECTION_SUCCESS, SERIALS_COLLECTION_ERROR, SERIALS_COLLECTION_PREVIEW } from '../actions/serials-collection';
/**
 * Начальное состояние редюсера сериалов.
 * @typedef {Object} initialState
 * @property {boolean} serialsRequest - Флаг, указывающий на выполнение запроса сериалов.
 * @property {boolean} serialsSuccess - Флаг успешного выполнения запроса сериалов.
 * @property {boolean} serialsError - Флаг ошибки при выполнении запроса сериалов.
 * @property {null|Object} error - Объект ошибки при выполнении запроса сериалов.
 * @property {null|Object} serials - Данные о сериалах.
 * @property {null|Object} preview - Превью сериалов.
 */
const initialState = {
    serialsRequest: false,
    serialsSuccess: false,
    serialsError: false,
    error: null,
    serials: null,
    preview: null,
};

export const serialsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SERIALS_COLLECTION_REQUEST:
            return { ...state, serialsRequest: true };
        case SERIALS_COLLECTION_PREVIEW:
            return { ...state, preview: action.payload };
        case SERIALS_COLLECTION_SUCCESS:
            return { ...state, serialsRequest: false, serials: action.payload, serialsSuccess: true, serialsError: false, error: null };
        case SERIALS_COLLECTION_ERROR:
            return { ...state, serialsRequest: false, serialsSuccess: false, serialsError: true };
        default:
            return state;
    }
};
