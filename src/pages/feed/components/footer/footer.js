/* global Handlebars */
export class FeedFooter {
    render() {
        const template = Handlebars.templates['footer-feed.hbs'];
        return template();
    }
}