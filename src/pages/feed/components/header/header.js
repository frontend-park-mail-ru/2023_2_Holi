/* global Handlebars */
export class FeedHeader {
    render() {
        const template = Handlebars.templates['header-feed.hbs'];
        return template();
    }
}