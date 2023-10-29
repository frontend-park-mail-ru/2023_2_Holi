import { logoutRequest } from '../../services/api/auth.js';
import { getContentById } from '../../services/api/content.js';
import { navigate } from '../../services/router/Router.js';

/*global Handlebars */
export class ContentPage {
    #parent;
    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        const template = Handlebars.templates['content.hbs'];

        getContentById(5);
        this.#parent.innerHTML = template();

        document.getElementById('logout').addEventListener('click', async function() {
            const response = await logoutRequest();
            if (response.ok) {
                navigate('/login');
            }
        });

        document.getElementById('dropdown').addEventListener('click', function() {
            this.parentNode.parentNode.classList.toggle('closed');
        }, false);

    }
}
