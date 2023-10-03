export class LoginHeader {
    render() {
        const template = Handlebars.templates['header-login.hbs'];
        return template();
    }
}