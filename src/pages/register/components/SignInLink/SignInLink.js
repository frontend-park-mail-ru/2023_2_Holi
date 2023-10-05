/* global Handlebars */
export class SignInLink {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }
    render() {
        const template = Handlebars.templates['SignInLink.hbs'];
        this.#parent.insertAdjacentHTML('beforeend', template({template}));
    }
}
