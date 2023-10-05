import { Notify } from '../../components/notify/notify.js';
import { registerRequest } from '../../services/api/auth.js';
import { goToLink } from '../../services/goToLink.js';
import { CreatePasswordContent } from './components/CreatePasswordContent/CreatePasswordContent.js';
import { Header } from './components/Header/Header.js';
import { RegFooter } from './components/RegFooter/RegFooter.js';

export class CreatePassword {
    #parent;
    #config;

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

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

const registerController = () => {
    const registerForm = document.forms['createPassword'];
    const emailInput = registerForm.elements['email'];
    emailInput.value = localStorage.getItem('userNewEmail');
    const passwordInput = registerForm.elements['password'];
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;

        try {
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
