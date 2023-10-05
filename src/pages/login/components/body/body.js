/* global Handlebars */

/**
 * Класс, представляющий тело страницы входа.
 */
export class LoginBody {
    /**
     * Рендерит тело страницы входа с использованием шаблона Handlebars.
     * @returns {string} - Строка HTML, представляющая тело страницы входа.
     */
    render() {
        /**
        * Шаблон Handlebars для отображения тела страницы входа.
        * @type {HandlebarsTemplateDelegate}
        */
        const template = Handlebars.templates['body.hbs'];

        return template();
    }
}
