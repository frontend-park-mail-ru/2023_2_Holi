/* global Handlebars */

/**
 * Класс, представляющий ссылку на страницу входа.
 */
export class SignInLink {
    #parent;

    /**
     * Создает новый экземпляр класса SignInLink.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена ссылка на страницу входа.
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Рендерит ссылку на страницу входа.
     */
    render() {
        const template = Handlebars.templates['SignInLink.hbs'];
        this.#parent.insertAdjacentHTML('beforeend', template({template}));
    }
}
