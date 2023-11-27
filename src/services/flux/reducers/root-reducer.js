import { combineReducers } from '../redux-lite';
import { authReducer } from './auth';
import { collectionsReducer } from './collections';
import { favouritesReducer } from './like';
import { userReducer } from './user-info';

// Создаем стор с использованием combineReducers
export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    collections: collectionsReducer,
    favourites: favouritesReducer,
    // Добавьте другие редьюсеры при необходимости
});
