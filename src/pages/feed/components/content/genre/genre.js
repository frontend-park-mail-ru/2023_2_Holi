export class GenreRow {
    #genreTitle
    #genreContent
    #id_carousel
    #id_container

    constructor(title, content, id_carousel, id_container) {
        this.#genreTitle = title;
        this.#genreContent = content;
        this.#id_carousel = id_carousel;
        this.#id_container = id_container;
    }

    render() {
       
        const context = {
            'genreTitle': this.#genreTitle,
            'genreContent': this.#genreContent,
            'id_container': this.#id_container,
            'id_carousel': this.#id_carousel

        }

        console.log(context)
        
        const template = Handlebars.templates['genre.hbs'];

        return template(context);
    }
}

window.linkTo = function (url) {
    console.log(url)
    history.pushState(null, null, url);
}