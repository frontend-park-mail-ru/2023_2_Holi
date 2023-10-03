import { RegisterContextBody } from "../RegisterContextBody/RegisterContextBody.js";
import { SubmitRegisterButton } from "../SubmitRegisterButton/SubmitRegisterButton.js";
import { RegisterStepHeader } from "../RegisterStepHeader/RegisterStepHeader.js";
import { FormList } from "../FormList/FormList.js";
import { LinkForgotPassword } from "../LinkForgotPassword/LinkForgotPassword.js";

export class AlreadyCreatedPasswordContent {
    #parent
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render() {
        const template = Handlebars.templates['AlreadyCreatedPasswordContent.hbs'];

        this.#parent.insertAdjacentHTML('beforeend', template());

        const upperSibling = this.#parent.querySelector("form")

        const stepHeader = new RegisterStepHeader(upperSibling, this.#config.alreadyCreated)
        const contextBody = new RegisterContextBody(upperSibling, this.#config.alreadyCreated.contextBody)
        const formList = new FormList(upperSibling, this.#config.alreadyCreated.formList)
        const link = new LinkForgotPassword(upperSibling)
        const submitButton = new SubmitRegisterButton(upperSibling)

        stepHeader.render()
        contextBody.render()
        formList.render()
        link.render()
        submitButton.render()
    }
}

