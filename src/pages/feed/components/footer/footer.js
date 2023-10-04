/* global Handlebars */

/**
 * Класс, представляющий подвал ленты.
 */
export class FeedFooter {
    /**
    * Рендерит подвал ленты с использованием шаблона Handlebars.
    * @returns {string} - Строка HTML, представляющая подвал ленты.
    */
    render() {
        /**
        * Шаблон Handlebars для отображения подвала ленты.
        * @type {HandlebarsTemplateDelegate}
        */
        const template = Handlebars.templates['footer-feed.hbs'];
        return template();
    }
}
