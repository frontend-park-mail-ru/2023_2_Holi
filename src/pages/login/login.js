import { Notify } from "../../components/notify/notify.js";
import { loginRequest } from "../../services/api/auth.js";
import { LoginBody } from "./components/body/body.js";
import { LoginFooter } from "./components/footer/footer.js";
import { LoginHeader } from "./components/header/header.js";

export class LoginPage {
    #parent

    constructor(parent) {
        this.#parent = parent
    }

    render() {
        this.#parent.innerHTML = '';
        const login = document.createElement('login');
        const login_wrapper = document.createElement('login-wraper');
        login.appendChild(login_wrapper);

        const background = document.createElement('login-background');
        login_wrapper.appendChild(background);

        const header = document.createElement('login-header');
        header.innerHTML = new LoginHeader().render();
        login_wrapper.appendChild(header);

        const body = document.createElement('login-body');
        body.innerHTML = new LoginBody().render();
        login_wrapper.appendChild(body);

        const footer = document.createElement('login-footer');
        footer.innerHTML = new LoginFooter().render();
        login_wrapper.appendChild(footer);

        this.#parent.appendChild(login);


        loginContoller();
    }
}


const loginContoller = () => {
    const loginForm = document.forms['loginForm'];
    console.log(loginForm)
    const emailInput = loginForm.elements['email'];
    const passwordInput = loginForm.elements['password'];

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            const response = await loginRequest(email, password);

            if (response.ok) {
                //navigate to feed
            } else {
                console.error('Ошибка аутентификации:', response.statusText)
            }
        } catch (error) {
            new Notify("Ошибка сети").panic()
            console.error('Ошибка аутентификации:')
        }
    })
}