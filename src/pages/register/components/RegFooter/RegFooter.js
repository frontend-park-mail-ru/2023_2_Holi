export class RegFooter {
    #parent 

    constructor(parent) {
        this.#parent = parent;

    }
    
    render() {
        const template = Handlebars.templates['RegFooter.hbs'];

        this.#parent.insertAdjacentHTML('beforeend', template({template}));
    }
}
