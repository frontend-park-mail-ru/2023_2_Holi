export class SubmitRegisterButton {
    #parent
    // #config

    constructor(parent) {
        this.#parent = parent;
        // this.#config = config;
    }

    render() {
        const template = Handlebars.templates['SubmitRegisterButton.hbs'];

        // const text = config.registerContextBody;

        this.#parent.insertAdjacentHTML('beforeend', template());

    }
}
