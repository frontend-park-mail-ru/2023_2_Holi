/* global Handlebars */

/**
 * Класс, представляющий подвал страницы входа.
 */
export class LoginFooter {

    /**
     * Рендерит подвал страницы входа с использованием шаблона Handlebars.
     * @returns {string} - Строка HTML, представляющая подвал страницы входа.
     */
    render() {
        /**
        * Шаблон Handlebars для отображения подвала страницы входа.
        * @type {HandlebarsTemplateDelegate}
        */
        const template = Handlebars.templates['footer.hbs'];
        return template();
    }
}
