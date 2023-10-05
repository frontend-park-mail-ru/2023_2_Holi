/* global Handlebars */

/**
 * Класс, представляющий контекстное тело регистрационной страницы.
 */
export class RegisterContextBody {
    #parent;
    #config;

    /**
     * Создает новый экземпляр класса RegisterContextBody.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлено контекстное тело.
     * @param {Object} config - Конфигурация для контекстного тела.
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Рендерит контекстное тело регистрационной страницы.
     */
    render() {
        const template = Handlebars.templates['RegisterContextBody.hbs'];

        const text = this.#config.text;
        const classes = this.#config.classes;

        this.#parent.insertAdjacentHTML('beforeend', template({ text, classes }));

    }
}
