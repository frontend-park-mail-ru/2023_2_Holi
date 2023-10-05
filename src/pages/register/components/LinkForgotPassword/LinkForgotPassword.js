/* global Handlebars */

/**
 * Класс, представляющий ссылку на страницу восстановления пароля.
 */
export class LinkForgotPassword {
    #parent ;

    /**
     * Создает новый экземпляр класса LinkForgotPassword.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена ссылка.
     */
    constructor(parent) {
        this.#parent = parent;
    }

     /**
     * Рендерит ссылку на страницу восстановления пароля.
     */
    render() {
        const template = Handlebars.templates['LinkForgotPassword.hbs'];
        this.#parent.insertAdjacentHTML('beforeend', template({template}));
    }
}
