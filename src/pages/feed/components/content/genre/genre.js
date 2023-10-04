/* global Handlebars */

/**
 * Класс, представляющий строку с подборкой по жанру.
 */
export class GenreRow {
    #genreTitle;
    #genreContent;
    #idCarousel;
    #idContainer;

    /**
     * Создает новый экземпляр класса GenreRow.
     * @param {string} title - Заголовок жанра.
     * @param {string} content - Содержимое жанра.
     * @param {string} idCarousel - Идентификатор карусели для этого жанра.
     * @param {string} idContainer - Идентификатор контейнера для этого жанра.
     */
    constructor(title, content, idCarousel, idContainer) {
        this.#genreTitle = title;
        this.#genreContent = content;
        this.#idCarousel = idCarousel;
        this.#idContainer = idContainer;
    }


    /**
    * Рендерит строку жанра с использованием шаблона Handlebars.
    * @returns {string} - Строка HTML, представляющая строку жанра.
    */
    render() {

        const context = {
            'genreTitle': this.#genreTitle,
            'genreContent': this.#genreContent,
            'idContainer': this.#idContainer,
            'idCarousel': this.#idCarousel

        };
        /**
         * Шаблон Handlebars для отображения строки жанра.
         * @type {HandlebarsTemplateDelegate}
         */
        const template = Handlebars.templates['genre.hbs'];

        return template(context);
    }
}


