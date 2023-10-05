import { Notify } from '../../components/notify/notify.js';
import { goToLink } from '../../services/goToLink.js';
/* global Handlebars */

/**
 * Класс, представляющий главную страницу.
 */
export class MainPage {
    #parent;

    /**
     * Создает новый экземпляр класса MainPage.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена главная страница.
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Рендерит главную страницу.
     */
    render() {
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        const template = Handlebars.templates['main-page.hbs'];
        this.#parent.innerHTML = template();
        mainController();
    }
}

/**
 * Функция-контроллер для обработки событий на главной странице.
 */
const mainController = () => {
    const mainForm = document.forms['mainForm'];
    const emailInput = mainForm.elements['email'];

    mainForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value;
        if (email) {
            localStorage.setItem('userNewEmail', email);
            goToLink('register1');
        } else {
            console.error('Не введен email');
            new Notify('Введите email').panic();
        }
    });
};
