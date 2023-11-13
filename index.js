import { Router, ProtectedRoute, Route } from './src/services/router/Router.js';
import { checkAccess, csrfInit } from './src/services/api/auth.js';
import { MainPage } from './src/pages/main/main-page.js';
import './src/static/assets/style.css';
import { LoginPage } from './src/pages/login/login.js';
import { StartRegister } from './src/pages/register/start-register.js';
import { MainRegister } from './src/pages/register/main-register.js';
import { FeedPage } from './src/pages/feed/feed.js';
import { Page404 } from './src/pages/404/404.js';
import { ContentPage } from './src/pages/content/content.js';
import { ProfilePage } from './src/pages/profile/profile-page.js';
import { CastPage } from './src/pages/cast/cast.js';

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
    new ProtectedRoute('/', await import('/src/pages/main/main-page.js'), 'guest'),
    new ProtectedRoute('/login', await import('/src/pages/login/login.js'), 'guest'),
    new ProtectedRoute('/start-register', await import('/src/pages/register/start-register.js'), 'guest'),
    new ProtectedRoute('/register',await import('/src/pages/register/main-register.js'), 'guest'),
    new ProtectedRoute('/feed', await import('/src/pages/feed/feed.js')),

    new ProtectedRoute(/^\/movies\/\d+$/, await import('/src/pages/content/content.js')),
    new ProtectedRoute('/profile', await import('/src/pages/profile/profile-page.js')),
    new ProtectedRoute(/^\/cast\/\d+$/, await import('/src/pages/cast/cast.js')),
    new Route('*', await import('/src/pages/404/404.js')),
];

new Router(routes, checkAccess, '/login', '/feed', '[spa-link]', 'toasts');
