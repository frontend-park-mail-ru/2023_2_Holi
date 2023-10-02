import { RegisterContextBody } from "../RegisterContextBody/RegisterContextBody.js";
import { SubmitRegisterButton } from "../SubmitRegisterButton/SubmitRegisterButton.js";
import { RegisterStepHeader } from "../RegisterStepHeader/RegisterStepHeader.js";
import { FormList } from "../FormList/FormList.js";
import {EmailPreferenceContainer} from '../EmailPreferenceContainer/EmailPreferenceContainer.js';

export class CreatePasswordContent {
    #parent
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render() {
        const template = Handlebars.templates['CreatePasswordContent.hbs'];

        this.#parent.insertAdjacentHTML('beforeend', template());

        const upperSibling = this.#parent.querySelector("form")

        const stepHeader = new RegisterStepHeader(upperSibling, this.#config.createPassword)
        const upperContextBody = new RegisterContextBody(upperSibling, this.#config.createPassword.upperContextBody)
        const lowerContextBody = new RegisterContextBody(upperSibling, this.#config.createPassword.lowerContextBody)
        const formList = new FormList(upperSibling, this.#config.createPassword.formList)
        const preferenceContainer = new EmailPreferenceContainer(upperSibling)
        const submitButton = new SubmitRegisterButton(upperSibling, '/feed')

        stepHeader.render()
        upperContextBody.render()
        lowerContextBody.render()
        formList.render()
        preferenceContainer.render()
        submitButton.render()
    }
}

