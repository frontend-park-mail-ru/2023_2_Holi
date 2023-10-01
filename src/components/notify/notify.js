export class Notify {
    #message;

    constructor(message) {
        this.#message = message;
    }
    panic() {
        const root = document.getElementById('root');

        const notify = document.createElement('notify')
        setTimeout(() => {
            notify.remove();
        }, 2000)
        notify.innerHTML = this.#message;
        root.appendChild(notify);
    }
}