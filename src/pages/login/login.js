import { Notify } from '../../components/notify/notify.js';
import { loginRequest } from '../../services/api/auth.js';
import { navigate } from '../../services/router/Router.js';
import { rootElement } from '../../../index.js';
import Store from '../../services/store.js';
/*global Handlebars */

/**
 * Класс, представляющий страницу входа.
 */
class LoginPage {
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
                    const res = await response.json();
                    localStorage.setItem('userId', res.body.id);
                    navigate('/feed');
                } else {
                    new Notify('Неверный логин или пароль');
                    console.error('Ошибка аутентификации:\n', response.statusText);

                    return;
                }
            } else {
                new Notify('Не ввели данные для входа');

                return;
            }
        } catch (error) {
            new Notify('Упс... Что то пошло не так :(');
            console.error('Ошибка аутентификации:', error);
        }
    });
};

export default new LoginPage(rootElement);
