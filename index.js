import { Router } from './src/services/router/Router.js';
import { Route } from './src/services/router/Route.js';
import { LoginPage } from './src/pages/login/login.js';
import { FeedPage } from './src/pages/feed/feed.js';

const rootElement = document.getElementById('root');



const routes = [
    new Route('/', new LoginPage(rootElement)),
    new Route('/feed', new FeedPage(rootElement)),
    // new Route('/about', new AboutComponent()),
    // new Route('*', new HomeComponent())
];

new Router(routes);


// const header = new WhiteHeader(headerElement);
// header.render();
