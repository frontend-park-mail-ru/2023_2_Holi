import { Notify } from '../../components/notify/notify.js';
import { navigate } from '../../services/router/Router.js';
import main from '../../../dist/main-page.js';
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
        document.body.style.background = '#000';
        console.log(Handlebars);
        this.#parent.innerHTML = Handlebars.templates['main-page.hbs']();

        mainController();
    }
}

/**
 * Функция-контроллер для обработки событий на главной странице.
 */
const mainController = () => {
    const mainForm = document.forms['mainForm'];
    const emailInput = mainForm.elements['email'];

    mainForm.addEventListener('submit', function (event) {
        event.preventDefault();
        console.info(1);
        const email = emailInput.value;
        if (email) {
            localStorage.setItem('userNewEmail', email);
            history.pushState(null, null, '/start-register');
            navigate('/start-register');
        } else {
            console.error('Не введен email');
            new Notify('Введите email');
        }
    });
};

