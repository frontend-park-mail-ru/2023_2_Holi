import { RegisterContextBody } from "../RegisterContextBody/RegisterContextBody.js";
import { SubmitRegisterButton } from "../SubmitRegisterButton/SubmitRegisterButton.js";
import { RegisterStepHeader } from "../RegisterStepHeader/RegisterStepHeader.js";
import { FormList } from "../FormList/FormList.js";
import {EmailPreferenceContainer} from '../EmailPreferenceContainer/EmailPreferenceContainer.js';
/* global Handlebars */

/**
 * Класс, представляющий содержимое страницы создания пароля.
 */
export class CreatePasswordContent {
    #parent;
    #config;

    /**
     * Создает новый экземпляр класса CreatePasswordContent.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлено содержимое.
     * @param {Object} config - Конфигурация для содержимого.
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

     /**
     * Рендерит содержимое страницы создания пароля.
     */
    render() {
        const template = Handlebars.templates['CreatePasswordContent.hbs'];

        this.#parent.insertAdjacentHTML('beforeend', template());

        const upperSibling = this.#parent.querySelector("form");

        const stepHeader = new RegisterStepHeader(upperSibling, this.#config.createPassword);
        const upperContextBody = new RegisterContextBody(upperSibling, this.#config.createPassword.upperContextBody);
        const lowerContextBody = new RegisterContextBody(upperSibling, this.#config.createPassword.lowerContextBody);
        const formList = new FormList(upperSibling, this.#config.createPassword.formList);
        const preferenceContainer = new EmailPreferenceContainer(upperSibling);
        const submitButton = new SubmitRegisterButton(upperSibling, '/feed');

        stepHeader.render();
        upperContextBody.render();
        lowerContextBody.render();
        formList.render();
        preferenceContainer.render();
        submitButton.render();
    }
}

