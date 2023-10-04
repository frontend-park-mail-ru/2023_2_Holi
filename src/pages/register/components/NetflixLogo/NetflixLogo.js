/* global Handlebars */
export class NetflixLogo {
    #parent 

    constructor(parent) {
        this.#parent = parent;

    }
    
    render() {
        const template = Handlebars.templates['NetflixLogo.hbs'];

        this.#parent.insertAdjacentHTML('beforeend', template({template}));
    }
}
