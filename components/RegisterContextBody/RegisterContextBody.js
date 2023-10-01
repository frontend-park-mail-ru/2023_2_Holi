export class RegisterContextBody {
    #parent
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render() {
        const template = Handlebars.templates['RegisterContextBody.hbs'];

        const text = this.#config.registerContextBody.text;

        this.#parent.insertAdjacentHTML('beforeend', template({ text }));

    }
}
