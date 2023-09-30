import {NetflixLogo} from "../NetflixLogo/NetflixLogo.js"
// import {SignInLink} from "../SignInLink/SignInLink.js"

export class WhiteHeader {
    #parent 

    constructor(parent) {
        this.#parent = parent;

    }
    
    render() {
        const template = Handlebars.templates['WhiteHeader.hbs'];

        this.#parent.insertAdjacentHTML('beforeend', template({template}));

        const row = this.#parent.querySelector(".header-content").Child

        (new NetflixLogo(row)).render()
        (new SignInLink(row)).render()
    }
}
