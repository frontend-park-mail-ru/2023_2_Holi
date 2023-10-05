/* global Handlebars */

/**
 * Класс, представляющий заголовок страницы ленты.
 */
export class FeedHeader {
     /**
     * Рендерит заголовок страницы ленты.
     * @returns {string} HTML-разметка заголовка.
     */
    render() {
        const template = Handlebars.templates['header-feed.hbs'];

        return template();
    }
}
