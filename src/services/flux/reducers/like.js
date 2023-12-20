import { GET_FAVOURITES } from '../actions/like';
/**
 * Начальное состояние редюсера избранных.
 * @constant
 * @type {Object}
 * @property {null|Object} favourites - Избранные элементы.
 */
const initialState = {
    favourites: null,
};
/**
 * Редюсер избранных.
 * @function
 * @param {Object} state - Текущее состояние редюсера.
 * @param {Object} action - Действие, которое нужно применить к состоянию.
 * @returns {Object} Новое состояние редюсера.
 */
export const favouritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FAVOURITES:
            return { ...state, favourites: action.payload };
        default:
            return state;
    }
};
