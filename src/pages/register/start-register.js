/*global Handlebars*/

import { rootElement } from '../../../index.js';

/**
 * Класс, представляющий начало регистрации.
 */
class StartRegister {
    #parent;

    /**
     * Создает новый экземпляр класса StartRegister.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница входа.
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Рендерит страницу входа.
     */
    render() {
        this.#parent.innerHTML = '';
        document.body.style.background = '#fff';
        const template = Handlebars.templates['start-register.hbs'];
        this.#parent.innerHTML = template();
    }
}

export default new StartRegister(rootElement);
