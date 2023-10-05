import { RegisterContextBody } from '../RegisterContextBody/RegisterContextBody.js';
import { SubmitRegisterButton } from '../SubmitRegisterButton/SubmitRegisterButton.js';
import { RegisterStepHeader } from '../RegisterStepHeader/RegisterStepHeader.js';
/* global Handlebars */

export class FinishAccContent {
    #parent;
    #config;

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render() {
        const template = Handlebars.templates['FinishAccContent.hbs'];

        this.#parent.insertAdjacentHTML('beforeend', template());

        const upperSibling = this.#parent.querySelector('.reg-form');

        const stepHeader = new RegisterStepHeader(upperSibling, this.#config.finishAcc);
        const contextBody = new RegisterContextBody(upperSibling, this.#config.finishAcc.registerContextBody);
        const submitButton = new SubmitRegisterButton(upperSibling, '/register2');

        stepHeader.render();
        document.querySelector('.step-indicator').style.textAlign = 'center';
        contextBody.render();
        submitButton.render();
    }
}
