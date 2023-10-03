import { Router, ProtectedRoute, Route } from './src/services/router/Router.js';
import { LoginPage } from './src/pages/login/login.js';
import { FeedPage } from './src/pages/feed/feed.js';
import { FinishAсс } from './src/pages/register/register-finish.js';
import { CreatePassword } from './src/pages/register/register-page-create-password.js';
import { PasswordAlreadyCreated } from './src/pages/register/register-pssword-alredy-created.js';
import { config } from './src/services/config.js';
import { MainPage } from './src/pages/main/main-page.js';

const rootElement = document.getElementById('root');

const routes = [
    new Route('/', new MainPage(rootElement)),
    new ProtectedRoute('/login', new LoginPage(rootElement)),
    new ProtectedRoute('/feed', new FeedPage(rootElement)),
    new ProtectedRoute('/register1', new FinishAсс(rootElement, config)),
    new ProtectedRoute('/register2', new CreatePassword(rootElement, config)),
    new ProtectedRoute('/register3', new PasswordAlreadyCreated(rootElement, config))

];

new Router(routes);



