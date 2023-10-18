/*global Handlebars*/

/**
 * Класс, представляющий начало регистрации.
 */
export class MainRegister {
    #parent;

    /**
     * Создает новый экземпляр класса MainRegister.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница регистрации.
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Рендерит страницу регистрации.
     */
    render() {
        this.#parent.innerHTML = '';
        document.body.style.background = '#fff';
        const template = Handlebars.templates['main-register.hbs'];
        this.#parent.innerHTML = template();
    }
}
