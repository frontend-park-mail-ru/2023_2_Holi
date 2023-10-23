import { Notify } from '../../components/notify/notify.js';
import { loginRequest } from '../../services/api/auth.js';
import { goToLink } from '../../services/goToLink.js';
/*global Handlebars */

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
        this.#parent.innerHTML = '';
        document.body.style.background = '#000';
        const template = Handlebars.templates['login-page.hbs'];
        this.#parent.innerHTML = template();

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

    loginForm.addEventListener('submit', async function (event) {
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
};
