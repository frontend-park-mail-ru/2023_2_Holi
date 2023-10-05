/* global Handlebars */

/**
 * Класс, представляющий кнопку отправки формы регистрации.
 */
export class SubmitRegisterButton {
    #parent;

    /**
     * Создает новый экземпляр класса SubmitRegisterButton.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена кнопка отправки формы.
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Рендерит кнопку отправки формы регистрации.
     */
    render() {
        const template = Handlebars.templates['SubmitRegisterButton.hbs'];
        this.#parent.insertAdjacentHTML('beforeend', template());
    }
}
