export class MainContent {
    render() {
        const template = Handlebars.templates['main-content.hbs'];
        return template();
    }
}