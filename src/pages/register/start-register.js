import register from './start-register.hbs';
/**
 * Класс, представляющий начало регистрации.
 */
export class StartRegister {
    #parent;

    /**
     * Создает новый экземпляр класса StartRegister.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница входа.
     */
    constructor(parent = document.getElementById('root')) {
        this.#parent = parent;
    }

    /**
     * Рендерит страницу входа.
     */
    render() {
        this.#parent.innerHTML = '';
        this.#parent.innerHTML = register();
    }
}
