/* global Handlebars */
export class Page404 {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        const template = Handlebars.templates['404.hbs'];
        this.#parent.innerHTML = template();
    }
}
