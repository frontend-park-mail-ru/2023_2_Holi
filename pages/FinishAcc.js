import { FinishAccContent } from "../components/FinishAccContent/FinishAccContent.js";
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
        const content = new FinishAccContent(this.#parent, this.#config)
        const footer = new RegFooter(this.#parent)

        header.render()
        content.render()
        footer.render()
    }
}
