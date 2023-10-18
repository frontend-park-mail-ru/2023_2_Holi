/*global Handlebars*/

/**
 * Класс, представляющий начало регистрации.
 */
export class StartRegister {
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
