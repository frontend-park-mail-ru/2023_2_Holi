import { SERIALS_CONTENT_ERROR, SERIALS_CONTENT_REQUEST, SERIALS_CONTENT_SUCCESS } from '../actions/serial-content';

/**
 * Начальное состояние редюсера сериалов.
 * @typedef {Object} initialState
 * @property {boolean} serialsRequest - Флаг, указывающий на выполнение запроса сериалов.
 * @property {boolean} serialsSuccess - Флаг успешного выполнения запроса сериалов.
 * @property {boolean} serialsError - Флаг ошибки при выполнении запроса сериалов.
 * @property {null|Object} error - Объект ошибки при выполнении запроса сериалов.
 * @property {null|Object} serial - Данные о сериале.
 */

const initialState = {
    serialsRequest: false,
    serialsSuccess: false,
    serialsError: false,
    error: null,
    serial: null,
};
/**
 * Редюсер для управления состоянием сериалов.
 * @param {SerialReducerState} state - Текущее состояние редюсера.
 * @param {Object} action - Экшен для обновления состояния.
 * @returns {SerialReducerState} Новое состояние редюсера.
 */
export const serialReducer = (state = initialState, action) => {
    switch (action.type) {
        case SERIALS_CONTENT_REQUEST:
            return { ...state, serialsRequest: true };
        case SERIALS_CONTENT_SUCCESS:
            return { ...state, serialsRequest: false, serials: action.payload, serialsSuccess: true, serialsError: false, error: null };
        case SERIALS_CONTENT_ERROR:
            return { ...state, serialsRequest: false, serialsSuccess: false, serialsError: true };
        default:
            return state;
    }
};
