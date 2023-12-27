import store from '../../../index.js';
import login from './login-page.hbs';
import { $sentAuthRequest } from '../../services/flux/actions/auth.js';
import { validatePassword } from '../../services/validate.js';
import { Notify } from '../../components/notify/notify.js';
import { simulateAndRemoveLink } from '../../services/search-utils.js';

/**
 * Класс, представляющий страницу входа.
 */
export class LoginPage {
    #parent;

    /**
     * Создает новый экземпляр класса LoginPage.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница входа.
     */
    constructor(parent = document.getElementById('root')) {
        this.#parent = parent;
    }

    /**
     * Рендерит страницу входа.
     */
    render() {
        this.#parent.innerHTML = '';
        document.body.style.background = '#000';
        this.#parent.innerHTML = login();

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
        const password = Array.from(new TextEncoder().encode(passwordInput.value));

        if (email && password && validatePassword(passwordInput.value) === '') {
            store.dispatch($sentAuthRequest(email, password, () => simulateAndRemoveLink('/feed')));
        } else {
            new Notify(validatePassword(passwordInput.value));
        }
    });

    store.subscribe('LOGIN_REDUCER', () => {
        const state = store.getState();
        if (state.auth.authError) {

            const error = state.auth.error.error.status;
            if (error == 404) {
                new Notify('Похоже такого пользователя нет');
            }
            else if (error == 409) {
                new Notify('Похоже вы уже авторизованы');
            }
            else if (error == 400) {
                new Notify('Неверный логин или пароль');
            }
            else {
                new Notify('Что-то пошло не так');
            }
        }
    });

};

