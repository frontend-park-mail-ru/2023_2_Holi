import { NetflixLogo } from '../NetflixLogo/NetflixLogo.js';
import { SignInLink } from '../SignInLink/SignInLink.js';
/* global Handlebars */

/**
 * Класс, представляющий заголовок страницы.
 */
export class Header {
    #parent;
    #config;

     /**
     * Создает новый экземпляр класса Header.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлен заголовок.
     * @param {Object} config - Конфигурация для заголовка.
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

     /**
     * Рендерит заголовок страницы с логотипом Netflix и ссылкой для входа.
     */
    render() {
        const template = Handlebars.templates['Header.hbs'];

        const classes = this.#config.whiteHeader.headerContent.classes;
        this.#parent.insertAdjacentHTML('beforeend', template({ classes }));

        const row = this.#parent.querySelector('.header-content-reg').children[0];

        const logo = new NetflixLogo(row);
        const link = new SignInLink(row);

        logo.render();
        link.render();
    }
}
