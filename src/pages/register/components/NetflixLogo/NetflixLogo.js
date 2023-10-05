/* global Handlebars */

/**
 * Класс, представляющий логотип Netflix.
 */
export class NetflixLogo {
    #parent;

    /**
     * Создает новый экземпляр класса NetflixLogo.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлен логотип Netflix.
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Рендерит логотип Netflix.
     */
    render() {
        const template = Handlebars.templates['NetflixLogo.hbs'];
        this.#parent.insertAdjacentHTML('beforeend', template({template}));
    }
}
