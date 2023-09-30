// import { WhiteHeader } from "../components/WhiteHeader/WhiteHeader.js";
import { RegFooter } from "../components/RegFooter/RegFooter.js";

export class FinishAсс {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.parent.innerHTML = ''

        const footer = new RegFooter(this.#parent)
        footer.render()

        
    }
}
