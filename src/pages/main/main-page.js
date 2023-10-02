export class MainPage {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = '';
        const template = Handlebars.templates['main-page.hbs'];

        this.#parent.innerHTML = template();
        mainController();
    }
}

const mainController = () => {
    const mainForm = document.forms['mainForm'];

    const emailInput = mainForm.elements['email'];

    mainForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = emailInput.value;
        localStorage.setItem('userNewEmail', email);
        const a = document.createElement('a');
        a.href = '/register1';
        a.setAttribute('data-link', '');
        document.body.appendChild(a);
        a.click();

    })
}