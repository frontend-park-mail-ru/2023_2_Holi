import notFound from './404.hbs';
export class Page404 {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        this.#parent.innerHTML = notFound();
    }
}

