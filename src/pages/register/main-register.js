import { registerRequest } from '../../services/api/auth.js';
import { Notify } from '../../components/notify/notify.js';
import { getUserInfo } from '../../services/api/user.js';
import { validatePassword } from '../../services/validate.js';
import register from './main-register.hbs';
/**
 * Класс, представляющий начало регистрации.
 */
export class MainRegister {
    #parent;

    /**
     * Создает новый экземпляр класса MainRegister.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница регистрации.
     */
    constructor(parent = document.getElementById('root')) {
        this.#parent = parent;
    }

    /**
     * Рендерит страницу регистрации.
     */
    render() {
        this.#parent.innerHTML = '';
        this.#parent.innerHTML = register();

        const registerForm = document.forms['createPassword'];
        const emailInput = registerForm.elements['email'];
        emailInput.value = localStorage.getItem('userNewEmail');
        const passwordInput = registerForm.elements['password'];
        registerForm.addEventListener('submit', async function(event) {
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
                        getUserInfo(res.body.id);
                        localStorage.removeItem('userNewEmail');

                        //Вручную эмитим событие popState
                        const popStateEvent = new PopStateEvent('popstate', { state: null, url: '/feed' });
                        window.dispatchEvent(popStateEvent);
                    } else {
                        localStorage.removeItem('userNewEmail');
                        if (response.status == 409) {
                            new Notify('Пользователь с данным email уже зарегистрирован');
                        } else {
                            new Notify('Ошибка регистрации');
                        }

                    }
                } else {
                    new Notify('Не ввели логин и/или пароль');
                }

            } catch (error) {

                new Notify(error);
            }
        });
    }
}
