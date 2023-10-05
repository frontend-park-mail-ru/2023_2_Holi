/* global Handlebars */

/**
 * Класс, представляющий верхний колонтитул страницы входа.
 */
export class LoginHeader {

    /**
    * Рендерит верхний колонтитул страницы входа с использованием шаблона Handlebars.
    * @returns {string} - Строка HTML, представляющая верхний колонтитул страницы входа.
    */
    render() {
        /**
        * Шаблон Handlebars для отображения верхнего колонтитула страницы входа.
        * @type {HandlebarsTemplateDelegate}
        */
        const template = Handlebars.templates['header-login.hbs'];

        return template();
    }
}
