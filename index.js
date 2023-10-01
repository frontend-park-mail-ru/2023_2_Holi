import { CreatePassword } from './pages/CreatePassword.js';
import { FinishAсс } from './pages/FinishAcc.js';
import { PasswordAlreadyCreated } from './pages/PasswordAlreadyCreated.js';
import { Router } from './modules/Router.js';
import { Route } from './modules/Route.js';

const rootElement = document.querySelector('#root');
// const headerElement = document.createElement('header');
const mainElement = document.createElement('main');
// rootElement.appendChild(headerElement);
rootElement.appendChild(mainElement);

const config = {
    whiteHeader: {
        headerContent: {
            classes: ['header-content-reg']
        }
    },
    finishAcc: {
        stepHeader: {
            span: {
                classes: ['step-indicator-finish-acc']
            },
            header: {
                classes: ['step-header-finish-acc'],
                text: 'Завершите настройку своего аккаунта'
            }
        },
        registerContextBody: {
            classes: ['context-body'],
            text: 'Netflix создан специально для вас. Создайте пароль, чтобы начать просмотр Netflix.'
        }
    },
    createPassword: {
        stepHeader: {
            span: {
                classes: ['step-indicator-create-password']
            },
            header: {
                classes: ['step-header-create-password'],
                text: 'Создайте пароль, чтобы присоединиться к Netflix'
            }
        },
        upperContextBody: {
            text: 'Еще несколько шагов, и все готово!'
        },
        lowerContextBody: {
            text: 'Мы тоже ненавидим бумажную волокиту.'
        },
        formList: {
            withHeader: false,
            inputs: [{
                inputClasses: ['form-input-create-password'],
                containerClasses: ['input-container-create-password'],
                placeholder: 'Введите почту',
                type: 'email'
            },
            {
                inputСlasses: ['form-input-create-password'],
                containerClasses: ['input-container-create-password'],
                placeholder: 'Введите пароль',
                type: 'password'
            }
            ]
        }
    },
    alreadyCreated: {
        stepHeader: {
            span: {
                classes: ['step-indicator-create-password']
            },
            header: {
                classes: ['step-header-create-password'],
                text: 'С возвращением!\nПрисоединиться к Netflix очень просто.'
            }
        },
        contextBody: {
            text: 'Введите свой пароль, и вы сразу же начнете просмотр.'
        },
        formList: {
            withHeader: true,
            headerStub: {
                text: 'Email',
                classes: []
            },
            header: {
                text: 'ax.chinaev@yandex.ru',
                classes: []
            },
            inputs: [{
                inputClasses: ['form-input-create-password'],
                containerClasses: ['input-container-create-password'],
                placeholder: 'Введите пароль',
                type: 'password'
            }]
        }
    }
};

const routes = [
    new Route('/register/intro', new FinishAсс(mainElement, config)),
    new Route('/register/create', new CreatePassword(mainElement, config)),
    new Route('/', new PasswordAlreadyCreated(mainElement, config)),
    // new Route('/', new HomeComponent()),
    // new Route('/about', new AboutComponent()),
    new Route('*', new FinishAсс(mainElement, config))
]

new Router(routes);

// routes[0].page.render()
// const header = new WhiteHeader(headerElement);
// header.render();
