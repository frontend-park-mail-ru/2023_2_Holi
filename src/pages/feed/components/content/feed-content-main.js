/* global Handlebars */

import { feedMainContextStatic } from "../../../../../static/static-context-main-feed";

export class FeedContentMain {
    #image;
    constructor(image) {
        this.#image = image;
    }
    render() {
        const template = Handlebars.templates['feed-content-main.hbs'];
        return template(feedMainContextStatic);
    }
}
