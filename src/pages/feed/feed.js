import { FeedHeader } from "./components/header/header.js";

export class FeedPage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render(){
        this.#parent.innerHTML = '';

        const header = document.createElement('div')
        header.innerHTML = new FeedHeader(this.#parent).render();

        this.#parent.appendChild(header)
    }
}