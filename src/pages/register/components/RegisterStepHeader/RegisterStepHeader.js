/* global Handlebars */

/**
 * Класс, представляющий заголовок шага регистрации.
 */
export class RegisterStepHeader {
    #parent;
    #config;

     /**
     * Создает новый экземпляр класса RegisterStepHeader.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлен заголовок шага регистрации.
     * @param {Object} config - Конфигурация для заголовка шага регистрации.
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Рендерит заголовок шага регистрации.
     */
    render() {
        const template = Handlebars.templates['RegisterStepHeader.hbs'];

        const spanClasses = this.#config.stepHeader.span.classes;
        const headerClasses = this.#config.stepHeader.header.classes;
        const headerText = this.#config.stepHeader.header.text;

        this.#parent.insertAdjacentHTML('beforeend', template({ spanClasses, headerClasses, headerText }));

    }
}
