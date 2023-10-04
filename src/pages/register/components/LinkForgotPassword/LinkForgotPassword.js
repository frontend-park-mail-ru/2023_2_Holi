/* global Handlebars */

export class LinkForgotPassword {
    #parent 
    constructor(parent) {
        this.#parent = parent;
    } 
    render() {
        const template = Handlebars.templates['LinkForgotPassword.hbs'];
        this.#parent.insertAdjacentHTML('beforeend', template({template}));
    }
}
