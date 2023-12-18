import { combineReducers } from '../redux-lite';
import { authReducer } from './auth';
import { collectionsReducer } from './collections';
import { favouritesReducer } from './like';
import { serialReducer } from './serial-content';
import { serialsReducer } from './serials-collection';
import { userReducer } from './user-info';

/**
 * Объединенный редюсер для управления состоянием всего приложения.
 * @constant
 * @type {Function}
 */
export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    collections: collectionsReducer,
    favourites: favouritesReducer,
    serials: serialsReducer,
    currentSerial: serialReducer,
    // Добавьте другие редьюсеры при необходимости
});
