import { Header } from "../components/Header/Header.js";
import { RegFooter } from "../components/RegFooter/RegFooter.js";

export class FinishAсс {
    #parent
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config
    }

    render() {
        this.#parent.innerHTML = ''

        const header = new Header(this.#parent, this.#config)
        header.render()
        
        const footer = new RegFooter(this.#parent)
        footer.render()
    }
}
