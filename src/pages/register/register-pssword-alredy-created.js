import { AlreadyCreatedPasswordContent } from './components/AlreadyCreatedPasswordContent/AlreadyCreatedPasswordContent.js';
import { Header } from './components/Header/Header.js';
import { RegFooter } from './components/RegFooter/RegFooter.js';

/**
 * Класс, представляющий страницу с сообщением о том, что пароль уже создан.
 */
export class PasswordAlreadyCreated {
    #parent;
    #config;

    /**
     * Создает новый экземпляр класса PasswordAlreadyCreated.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница.
     * @param {Object} config - Конфигурация для страницы с сообщением о том, что пароль уже создан.
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

     /**
     * Рендерит страницу с сообщением о том, что пароль уже создан.
     */
    render() {
        this.#parent.innerHTML = '';
        this.#parent.style.background = '#fff';
        const header = new Header(this.#parent, this.#config);
        const content = new AlreadyCreatedPasswordContent(this.#parent, this.#config);
        const footer = new RegFooter(this.#parent);

        header.render();
        content.render();
        footer.render();
    }
}
