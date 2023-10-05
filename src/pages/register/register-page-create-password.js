import { Notify } from '../../components/notify/notify.js';
import { registerRequest } from '../../services/api/auth.js';
import { goToLink } from '../../services/goToLink.js';
import { CreatePasswordContent } from './components/CreatePasswordContent/CreatePasswordContent.js';
import { Header } from './components/Header/Header.js';
import { RegFooter } from './components/RegFooter/RegFooter.js';

/**
 * Класс, представляющий страницу создания пароля пользователя.
 */
export class CreatePassword {
    #parent;
    #config;

    /**
    * Создает новый экземпляр класса CreatePassword.
    * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница создания пароля.
    * @param {Object} config - Конфигурация для страницы создания пароля.
    */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Рендерит страницу создания пароля пользователя.
     */
    render() {
        this.#parent.innerHTML = '';
        this.#parent.style.background = '#fff';
        const header = new Header(this.#parent, this.#config);
        const content = new CreatePasswordContent(this.#parent, this.#config);
        const footer = new RegFooter(this.#parent);

        header.render();
        content.render();
        footer.render();

        registerController();
    }
}

/**
 * Функция-контроллер для регистрации пользователя.
 */
const registerController = () => {
    const registerForm = document.forms['createPassword'];
    const emailInput = registerForm.elements['email'];
    emailInput.value = localStorage.getItem('userNewEmail');
    const passwordInput = registerForm.elements['password'];

    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        const valid = validatePassword(passwordInput.value);
        try {
            if(valid !== ''){
                new Notify(valid).panic();

                return;
            }
            if (email && password) {
                const response = await registerRequest(email, password);
                if (response.ok) {
                    localStorage.removeItem('userNewEmail');
                    goToLink('feed');
                } else {
                    localStorage.removeItem('userNewEmail');
                    new Notify('Ошибка регистрации: ' + response.statusText).panic();
                    console.error('Ошибка регистрации:', response.statusText);
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
