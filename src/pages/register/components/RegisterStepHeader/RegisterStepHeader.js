/* global Handlebars */
export class RegisterStepHeader {
    #parent
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render() {
        const template = Handlebars.templates['RegisterStepHeader.hbs'];

        const spanClasses = this.#config.stepHeader.span.classes;
        const headerClasses = this.#config.stepHeader.header.classes;
        const headerText = this.#config.stepHeader.header.text;

        this.#parent.insertAdjacentHTML('beforeend', template({ spanClasses, headerClasses, headerText }));

    }
}
