import { Router, ProtectedRoute, Route } from './src/services/router/Router.js';
import { LoginPage } from './src/pages/login/login.js';
import { FeedPage } from './src/pages/feed/feed.js';
import { MainPage } from './src/pages/main/main-page.js';
import { registerComponents } from './src/services/registerPartial.js';
import { Page404 } from './src/pages/404/404.js';
import { StartRegister } from './src/pages/register/start-register.js';
import { MainRegister } from './src/pages/register/main-register.js';

const rootElement = document.getElementById('root');

registerComponents();
const routes = [
    new Route('/', new MainPage(rootElement)),
    new Route('/login', new LoginPage(rootElement)),
    new ProtectedRoute('/feed', new FeedPage(rootElement)),
    new Route('/start-register', new StartRegister(rootElement)),
    new Route('/register', new MainRegister(rootElement)),

    new Route('*', new Page404(rootElement)),
];

new Router(routes);
