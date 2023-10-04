/* global Handlebars */
export class FormInput {
    #parent
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render() {
        const template = Handlebars.templates['FormInput.hbs'];

        const inputClasses = this.#config.inputClasses;
        const containerClasses = this.#config.containerClasses;
        const placeholder = this.#config.placeholder;
        const type = this.#config.type;

        this.#parent.insertAdjacentHTML('beforeend', template({ inputClasses, containerClasses, placeholder, type }));
    }
}
