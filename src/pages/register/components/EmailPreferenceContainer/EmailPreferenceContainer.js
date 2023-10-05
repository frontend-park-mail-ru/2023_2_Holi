/* global Handlebars */

/**
 * Класс, представляющий контейнер для электронной почты.
 */
export class EmailPreferenceContainer {
    #parent;

    /**
     * Создает новый экземпляр класса EmailPreferenceContainer.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлен контейнер.
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Рендерит контейнер для настройки предпочтений по электронной почте.
     */
    render() {
        const template = Handlebars.templates['EmailPreferenceContainer.hbs'];
        this.#parent.insertAdjacentHTML('beforeend', template({template}));
    }
}
