/* global Handlebars */
import { feedMainContextStatic } from '../../../../../static/static-context-main-feed.js';

/**
 * Класс, представляющий главное содержимое страницы ленты.
 */
export class FeedContentMain {
    #image;
    /**
     * Создает новый экземпляр класса FeedContentMain.
     * @param {string} image - URL изображения для отображения в главном содержимом.
     */
    constructor(image) {
        this.#image = image;
    }
    /**
    * Рендерит главное содержимое страницы ленты с использованием статического контекста.
    * @returns {string} HTML-разметка главного содержимого.
    */
    render() {
        const template = Handlebars.templates['feed-content-main.hbs'];

        return template(feedMainContextStatic);
    }
}
