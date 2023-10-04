/* global Handlebars */
export class LoginBody {
    render() {
        const template = Handlebars.templates['body.hbs'];
        return template();
    }
}