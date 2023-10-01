import { RegisterContextBody } from "../RegisterContextBody/RegisterContextBody.js";
import { SubmitRegisterButton } from "../SubmitRegisterButton/SubmitRegisterButton.js";
import { RegisterStepHeader } from "../RegisterStepHeader/RegisterStepHeader.js";

export class FinishAccContent {
    #parent
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render() {
        const template = Handlebars.templates['FinishAccContent.hbs'];

        this.#parent.insertAdjacentHTML('beforeend', template());

        const upperSibling = this.#parent.querySelector(".reg-form")

        const stepHeader = new RegisterStepHeader(upperSibling, this.#config)
        const contextBody = new RegisterContextBody(upperSibling, this.#config)
        const submitButton = new SubmitRegisterButton(upperSibling)

        stepHeader.render()
        contextBody.render()
        submitButton.render()
    }
}
