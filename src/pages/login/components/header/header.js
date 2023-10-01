export class LoginHeader {

    render() {
        const template = Handlebars.templates['header.hbs'];
        return template();
    }
}