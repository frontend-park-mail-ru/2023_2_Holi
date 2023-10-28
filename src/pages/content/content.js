/*global Handlebars */
export class ContentPage {
    #parent;
    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        const template = Handlebars.templates['content.hbs'];
        this.#parent.innerHTML = template();
    }
}
