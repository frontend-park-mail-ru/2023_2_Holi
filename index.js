import { Router, ProtectedRoute, Route } from './src/services/router/Router.js';
import { registerComponents } from './src/services/registerPartial.js';
import { checkAccess, csrfInit } from './src/services/api/auth.js';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then((reg) => {
            console.info('sw registered', reg);
        })
        .catch((e) => {
            console.error(e);
        });
}

export const rootElement = document.getElementById('root');

csrfInit();

registerComponents();
const routes = [
    new ProtectedRoute('/', '/src/pages/main/main-page.js', 'guest'),
    new ProtectedRoute('/login', '/src/pages/login/login.js', 'guest'),
    new ProtectedRoute('/feed', '/src/pages/feed/feed.js'),
    new ProtectedRoute('/start-register', '/src/pages/register/start-register.js', 'guest'),
    new ProtectedRoute('/register', '/src/pages/register/main-register.js', 'guest'),
    new ProtectedRoute(/^\/movies\/\d+$/, '/src/pages/content/content.js'),
    new ProtectedRoute('/profile', '/src/pages/profile/profile-page.js'),
    new ProtectedRoute(/^\/cast\/\d+$/, '/src/pages/cast/cast.js'),
    new Route('*', '/src/pages/404/404.js'),
];

new Router(routes, checkAccess, '/login', '/feed', '[spa-link]', 'toasts');

