import { FormInput } from "../FormInput/FormInput.js";
import { RegisterContextBody } from "../RegisterContextBody/RegisterContextBody.js";
export class FormList {
    #parent
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render() {
        const template = Handlebars.templates['FormList.hbs'];

        const classes = this.#config.classes
        this.#parent.insertAdjacentHTML('beforeend', template({ classes }));

        const mountPoint = this.#parent.querySelector(".form-list")

        if (this.#config.withHeader) {
            const emailStub = new RegisterContextBody(mountPoint, this.#config.headerStub)
            const contextBody = new RegisterContextBody(mountPoint, this.#config.header)

            emailStub.render()
            contextBody.render()
        }

        this.#config.inputs.map((input) => {
            const formInput = new FormInput(mountPoint, input)
            formInput.render()
        })
    }
}
