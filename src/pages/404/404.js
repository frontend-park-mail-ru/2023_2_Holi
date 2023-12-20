import notFound from './404.hbs';

/**
 * Класс для отображения страницы с ошибкой 404.
 */
export class Page404 {
    #parent;
    /**
         * Создает экземпляр класса Page404.
         *
         * @param {HTMLElement} [parent=document.getElementById('root')] - Родительский элемент, в который будет вставлен контент страницы.
         */
    constructor(parent = document.getElementById('root')) {
        /**
       * Родительский элемент, в который будет вставлен контент страницы.
       * @type {HTMLElement}
       * @private
       */
        this.#parent = parent;
    }
    /**
         * Рендерит страницу с ошибкой 404.
         */
    render() {
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        this.#parent.innerHTML = notFound();
    }
}

