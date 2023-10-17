import { Router, ProtectedRoute, Route } from './src/services/router/Router.js';
import { LoginPage } from './src/pages/login/login.js';
import { FeedPage } from './src/pages/feed/feed.js';
import { FinishAсс } from './src/pages/register/register-finish.js';
import { CreatePassword } from './src/pages/register/register-page-create-password.js';
import { PasswordAlreadyCreated } from './src/pages/register/register-pssword-alredy-created.js';
import { config } from './src/services/config.js';
import { MainPage } from './src/pages/main/main-page.js';
import { registerComponents } from './src/services/registerPartial.js';
import { Page404 } from './src/pages/404/404.js';
const rootElement = document.getElementById('root');

registerComponents();
const routes = [
    new Route('/', new MainPage(rootElement)),
    new Route('/login', new LoginPage(rootElement)),
    new ProtectedRoute('/feed', new FeedPage(rootElement)),
    new Route('/register1', new FinishAсс(rootElement, config)),
    new Route('/register2', new CreatePassword(rootElement, config)),
    new Route('/profile', new PasswordAlreadyCreated(rootElement, config)),
    new Route('*', new Page404(rootElement)),
];

new Router(routes);
