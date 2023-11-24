import { combineReducers } from '../redux-lite';
import { authReducer } from './auth';
import { userReducer } from './user-info';

// Создаем стор с использованием combineReducers
export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    // Добавьте другие редьюсеры при необходимости
});
