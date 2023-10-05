import { Header } from './components/Header/Header.js';
import { FinishAccContent } from './components/FinishAccContent/FinishAccContent.js';
import { RegFooter } from './components/RegFooter/RegFooter.js';
import { goToLink } from '../../services/goToLink.js';

/**
 * Класс, представляющий 1 страницу регистрации.
 */
export class FinishAсс {
    #parent;
    #config;

    /**
     * Создает новый экземпляр класса FinishAсs.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница.
     * @param {Object} config - Конфигурация для страницы.
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

     /**
     * Рендерит 1 страницу регистрации.
     */
    render() {
        this.#parent.innerHTML = '';
        this.#parent.style.background = '#fff';
        const header = new Header(this.#parent, this.#config);
        const content = new FinishAccContent(this.#parent, this.#config);
        const footer = new RegFooter(this.#parent);

        header.render();
        content.render();
        footer.render();

        finishRegController();
    }
}

const finishRegController = () => {
    const finishReg = document.forms['finishReg'];
    finishReg.addEventListener('submit', async function(event) {
        event.preventDefault();
        goToLink('register2');
    });
};
