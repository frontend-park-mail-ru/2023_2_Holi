import { Notify } from '../../components/notify/notify.js';
import { loginRequest } from '../../services/api/auth.js';
import { goToLink } from '../../services/goToLink.js';
import { LoginHeader } from './components/header/header.js';
import { LoginBody } from './components/body/body.js';
import { LoginFooter } from './components/footer/footer.js';

/**
 * Класс, представляющий страницу входа.
 */
export class LoginPage {
    #parent;

    /**
     * Создает новый экземпляр класса LoginPage.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница входа.
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Рендерит страницу входа.
     */
    render() {
        this.#parent.style.background = '';
        this.#parent.innerHTML = '';
        const login = document.createElement('login');
        const loginWrapper = document.createElement('login-wraper');
        login.appendChild(loginWrapper);

        const background = document.createElement('login-background');
        loginWrapper.appendChild(background);

        const header = document.createElement('login-header');
        header.innerHTML = new LoginHeader().render();
        loginWrapper.appendChild(header);

        const body = document.createElement('login-body');
        body.innerHTML = new LoginBody().render();
        loginWrapper.appendChild(body);

        const footer = document.createElement('login-footer');
        footer.innerHTML = new LoginFooter().render();
        loginWrapper.appendChild(footer);

        this.#parent.appendChild(login);

        loginContoller();
    }
}

/**
 * Функция-контроллер для обработки событий на странице входа.
 */
const loginContoller = () => {
    const loginForm = document.forms['loginForm'];
    const emailInput = loginForm.elements['email'];
    const passwordInput = loginForm.elements['password'];

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            if (email && password) {
                const response = await loginRequest(email, password);
                if (response.ok) {
                    goToLink('feed');
                } else {
                    new Notify('Ошибка аутентификации: ' + response.statusText).panic();
                    console.error('Ошибка аутентификации:', response.statusText);
                }
            } else {
                new Notify('Не ввели логин и/или пароль').panic();
            }
        } catch (error) {
            new Notify('Ошибка сети').panic();
            console.error('Ошибка аутентификации:');
        }
    });

    const link = document.getElementById('login-link');
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.info(45354);
        goToLink('/');
    });
};
