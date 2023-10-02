export class EmailPreferenceContainer {
    #parent 

    constructor(parent) {
        this.#parent = parent;

    }
    
    render() {
        const template = Handlebars.templates['EmailPreferenceContainer.hbs'];

        this.#parent.insertAdjacentHTML('beforeend', template({template}));
    }
}
