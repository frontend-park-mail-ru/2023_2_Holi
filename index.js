import { WhiteHeader } from './components/WhiteHeader/WhiteHeader.js';
import { FinishAсс } from './pages/FinishAcc.js';
import { Router } from './modules/Router.js';
import { Route } from './modules/Route.js';

const rootElement = document.querySelector('#root');
// const headerElement = document.createElement('header');
const mainElement = document.createElement('main');
// rootElement.appendChild(headerElement);
rootElement.appendChild(mainElement);


const routes = [
    new Route('/', new FinishAсс(mainElement))
    // new Route('/', new HomeComponent()),
    // new Route('/about', new AboutComponent()),
    // new Route('*', new HomeComponent())
];

new Router(routes);


// const header = new WhiteHeader(headerElement);
// header.render();
