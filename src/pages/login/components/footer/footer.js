/* global Handlebars */
export class LoginFooter {
    render() {
        const template = Handlebars.templates['footer.hbs'];
        return template();
    }
}