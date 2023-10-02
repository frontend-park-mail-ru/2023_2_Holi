export class MainFooter {

    constructor(parent) {
        const footer = document.createElement('footer');
        footer.innerHTML = this.render();
        parent.appendChild(footer);
    }
    render() {
        const template = Handlebars.templates['main-footer.hbs'];
        return template();
    }
}