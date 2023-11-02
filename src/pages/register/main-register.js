/*global Handlebars*/

import { registerRequest } from '../../services/api/auth.js';
import { Notify } from '../../components/notify/notify.js';
import { rootElement } from '../../../index.js';
/**
 * Класс, представляющий начало регистрации.
 */
class MainRegister {
    #parent;

    /**
     * Создает новый экземпляр класса MainRegister.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница регистрации.
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Рендерит страницу регистрации.
     */
    render() {
        this.#parent.innerHTML = '';
        document.body.style.background = '#fff';
        const template = Handlebars.templates['main-register.hbs'];
        this.#parent.innerHTML = template();

        const registerForm = document.forms['createPassword'];
        const emailInput = registerForm.elements['email'];
        emailInput.value = localStorage.getItem('userNewEmail');
        const passwordInput = registerForm.elements['password'];
        registerForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const email = emailInput.value;
            const password = Array.from(new TextEncoder().encode(passwordInput.value));

            const valid = validatePassword(passwordInput.value);
            try {
                if (valid !== '') {
                    new Notify(valid);

                    return;
                }
                if (email && password) {
                    const response = await registerRequest(email, password);
                    if (response.ok) {
                        const res = await response.json();
                        localStorage.setItem('userId', res.body.id);
                        localStorage.removeItem('userNewEmail');

                        //Вручную эмитим событие popState
                        const popStateEvent = new PopStateEvent('popstate', { state: null, url: '/feed' });
                        window.dispatchEvent(popStateEvent);
                    } else {
                        localStorage.removeItem('userNewEmail');
                        new Notify('Ошибка регистрации: ' + response.statusText);
                        console.error('Ошибка регистрации:', response.statusText);
                    }
                } else {
                    new Notify('Не ввели логин и/или пароль');
                }

            } catch (error) {
                new Notify('Ошибка регистрации');
                console.error('Ошибка аутентификации: ' + error);
            }
        });
    }
}

/**
 *
 * @param {string} password
 * @returns {string}
 */
function validatePassword(password) {
    // Проверка длины пароля (минимальная длина 8 символов)
    if (password.length < 8) {
        return 'Пароль должен содержать минимум 8 символов';
    }

    // Проверка наличия хотя бы одной заглавной буквы
    if (!/[A-Z]/.test(password)) {
        return 'Пароль должен содержать хотя бы одну заглавную букву';
    }

    // Проверка наличия хотя бы одной строчной буквы
    if (!/[a-z]/.test(password)) {
        return 'Пароль должен содержать хотя бы одну строчную букву';
    }

    // Проверка наличия хотя бы одной цифры
    if (!/[0-9]/.test(password)) {
        return 'Пароль должен содержать хотя бы одну цифру';
    }

    return '';
}

export default new MainRegister(rootElement);
