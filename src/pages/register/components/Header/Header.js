import { NetflixLogo } from "../NetflixLogo/NetflixLogo.js";
import { SignInLink } from "../SignInLink/SignInLink.js";
/* global Handlebars */
export class Header {
    #parent;
    #config;
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;

    }

    render() {
        const template = Handlebars.templates['Header.hbs'];

        const classes = this.#config.whiteHeader.headerContent.classes;
        this.#parent.insertAdjacentHTML('beforeend', template({ classes }));

        const row = this.#parent.querySelector(".header-content").children[0];

        const logo = new NetflixLogo(row);
        const link = new SignInLink(row);

        logo.render();
        link.render();

    }
}
