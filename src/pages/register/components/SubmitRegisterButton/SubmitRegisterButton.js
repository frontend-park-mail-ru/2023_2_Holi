/* global Handlebars */
export class SubmitRegisterButton {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const template = Handlebars.templates['SubmitRegisterButton.hbs'];
        this.#parent.insertAdjacentHTML('beforeend', template());
    }
}
