import { Notify } from "../../components/notify/notify.js";
import { goToLink } from "../../services/goToLink.js";

export class MainPage {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = '';
        const template = Handlebars.templates['main-page.hbs'];
        console.log(template)
        this.#parent.innerHTML = template();
        mainController();
    }
}

const mainController = () => {
    const mainForm = document.forms['mainForm'];

    const emailInput = mainForm.elements['email'];

    mainForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = emailInput.value;
        if (email) {
            localStorage.setItem('userNewEmail', email);
            goToLink('register1')
        } else {
            console.error('Не введен email')
            new Notify('Введите email').panic();
        }



    })
}