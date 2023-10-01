export class RegisterStepHeader {
    #parent
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render() {
        const template = Handlebars.templates['RegisterStepHeader.hbs'];

        const spanClasses = this.#config.registerStepHeader.span.classes;
        const headerClasses = this.#config.registerStepHeader.header.classes;
        const headerText = this.#config.registerStepHeader.header.text;

        this.#parent.insertAdjacentHTML('beforeend', template({ spanClasses, headerClasses, headerText }));

    }
}
