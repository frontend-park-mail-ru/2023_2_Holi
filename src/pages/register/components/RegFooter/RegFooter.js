/* global Handlebars */

/**
 * Класс, представляющий нижний колонтитул регистрационной страницы.
 */
export class RegFooter {
    #parent;

    /**
     * Создает новый экземпляр класса RegFooter.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлен нижний колонтитул.
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
    * Рендерит нижний колонтитул регистрационной страницы.
    */
    render() {
        const template = Handlebars.templates['RegFooter.hbs'];
        this.#parent.insertAdjacentHTML('beforeend', template({ template }));
    }
}
