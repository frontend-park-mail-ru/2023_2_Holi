import { Router, ProtectedRoute, Route } from './src/services/router/Router.js';
import { LoginPage } from './src/pages/login/login.js';
import { FeedPage } from './src/pages/feed/feed.js';
import { MainPage } from './src/pages/main/main-page.js';
import { registerComponents } from './src/services/registerPartial.js';
import { Page404 } from './src/pages/404/404.js';
import { StartRegister } from './src/pages/register/start-register.js';
import { MainRegister } from './src/pages/register/main-register.js';
import { ContentPage } from './src/pages/content/content.js';
import { CastPage } from './src/pages/cast/cast.js';

const rootElement = document.getElementById('root');

registerComponents();
const routes = [
    new ProtectedRoute('/', new MainPage(rootElement), 'anonim'),
    new ProtectedRoute('/login', new LoginPage(rootElement), 'anonim'),
    new ProtectedRoute('/feed', new FeedPage(rootElement)),
    new ProtectedRoute('/start-register', new StartRegister(rootElement), 'anonim'),
    new ProtectedRoute('/register', new MainRegister(rootElement), 'anonim'),
    new ProtectedRoute(/^\/movies\/\d+$/, new ContentPage(rootElement)),
    new ProtectedRoute('/test', new ContentPage(rootElement)),
    new Route(/^\/cast\/\d+$/, new CastPage(rootElement)),
    new Route('*', new Page404(rootElement)),
];

new Router(routes);
