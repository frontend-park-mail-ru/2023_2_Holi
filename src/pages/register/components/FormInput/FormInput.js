/* global Handlebars */

/**
 * Класс, представляющий компонент ввода формы.
 */
export class FormInput {
    #parent;
    #config;

    /**
     * Создает новый экземпляр класса FormInput.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлен компонент.
     * @param {Object} config - Конфигурация для компонента.
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

     /**
     * Рендерит компонент ввода формы.
     */
    render() {
        const template = Handlebars.templates['FormInput.hbs'];

        const inputClasses = this.#config.inputClasses;
        const containerClasses = this.#config.containerClasses;
        const placeholder = this.#config.placeholder;
        const type = this.#config.type;

        this.#parent.insertAdjacentHTML('beforeend', template({ inputClasses, containerClasses, placeholder, type }));
    }
}
