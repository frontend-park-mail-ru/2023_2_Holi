import { getStateSurveyMock } from '../../services/api/iframe';
import admin from './admin.hbs';
export class Admin {
    #parent;

    constructor(parent = document.getElementById('root')) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = '';
        const data = getStateSurveyMock();
        console.info(data);
        this.#parent.innerHTML = admin({content: data.body});
    }
}
