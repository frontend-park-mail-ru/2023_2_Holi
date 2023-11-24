import { Router, ProtectedRoute, Route } from './src/services/router/Router.js';
import { checkAccess, csrfInit } from './src/services/api/auth.js';
import { MainPage } from './src/pages/main/main-page.js';
import './src/static/assets/style.css';
import './src/static/icon.png';
import { LoginPage } from './src/pages/login/login.js';
import { StartRegister } from './src/pages/register/start-register.js';
import { MainRegister } from './src/pages/register/main-register.js';
import { FeedPage } from './src/pages/feed/feed.js';
import { Page404 } from './src/pages/404/404.js';
import { ContentPage } from './src/pages/content/content.js';
import { ProfilePage } from './src/pages/profile/profile-page.js';
import { CastPage } from './src/pages/cast/cast.js';
import { createStore } from './src/services/flux/redux-lite.js';
import { rootReducer } from './src/services/flux/reducers/root-reducer.js';

/*if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
            console.info('sw registered', reg);
        })
        .catch((e) => {
            console.error(e);
        });
}*/
export const rootElement = document.getElementById('root');

csrfInit();

const routes = [
    new ProtectedRoute('/', new MainPage(rootElement), 'guest'),
    new ProtectedRoute('/login', new LoginPage(rootElement), 'guest'),
    new ProtectedRoute('/start-register', new StartRegister(rootElement), 'guest'),
    new ProtectedRoute('/register', new MainRegister(rootElement), 'guest'),
    new ProtectedRoute('/feed', new FeedPage(rootElement)),

    new ProtectedRoute(/^\/movies\/\d+$/, new ContentPage(rootElement)),
    new ProtectedRoute('/profile', new ProfilePage(rootElement)),
    new ProtectedRoute(/^\/cast\/\d+$/, new CastPage(rootElement)),
    new Route('*', new Page404(rootElement)),
];

new Router(routes, '/login', '/feed', '[spa-link]', 'toasts');

export const isAuth = await checkAccess();
if (isAuth.ok) {
    localStorage.setItem('authData', true);
} else {
    localStorage.setItem('authData', false);
}

// Создание стора
const store = createStore(rootReducer);

// Экспорт стора, чтобы он был доступен в других частях приложения
export default store;
