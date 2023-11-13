import { rootElement } from '../../../index.js';
import notFound from './404.hbs';
class Page404 {
    #parent;

    constructor(parent = document.getElementById('root')) {
        this.#parent = parent;
    }

    render() {
        console.log(this.#parent);
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        this.#parent.innerHTML = notFound();
    }
}

export default new Page404(rootElement);

