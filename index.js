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
import { GenrePage } from './src/pages/genre/genre.js';
import { FavouritesPage } from './src/pages/like/like.js';
import { seachHandler } from './src/services/search-utils.js';
import { SerialFeedPage } from './src/pages/serials/serials-feed/serials-feed.js';
import { SerialContentPage } from './src/pages/serials/serials-feed/serial-content.js';
import { SerialGenrePage } from './src/pages/serials/serials-feed/serial-genre.js';
import { SerialCastPage } from './src/pages/serials/serials-feed/serial-cast.js';

// Создание стора
const store = createStore(rootReducer);

// Экспорт стора, чтобы он был доступен в других частях приложения
export default store;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
            console.info('sw registered', reg);
        })
        .catch((e) => {
            console.error(e);
        });
}

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
    new ProtectedRoute(/^\/genre\/\d+$/, new GenrePage(rootElement)),
    new ProtectedRoute('/list', new FavouritesPage(rootElement)),
    new ProtectedRoute('/serials', new SerialFeedPage(rootElement)),
    new ProtectedRoute(/^\/serial\/\d+$/, new SerialContentPage(rootElement)),
    new ProtectedRoute(/^\/serial-genre\/\d+$/, new SerialGenrePage(rootElement)),
    new ProtectedRoute(/^\/serial-cast\/\d+$/, new SerialCastPage(rootElement)),
    new Route('*', new Page404(rootElement)),
];

new Router(routes, '/login', '/feed', '[spa-link]', 'toasts');

//seachHandler();

export const isAuth = await checkAccess();
if (isAuth.ok) {
    localStorage.setItem('authData', true);
} else {
    localStorage.setItem('authData', false);
}
