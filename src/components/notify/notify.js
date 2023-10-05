/**
 * Класс для создания уведомлений в веб-приложении.
 */
export class Notify {
    /**
    * Сообщение, отображаемое в уведомлении.
    * @private
    * @type {string}
    */
    #message;

    /**
     * Создает экземпляр класса Notify с заданным сообщением.
     * @param {string} message - Сообщение для отображения в уведомлении.
     */
    constructor(message) {
        this.#message = message;
    }

    /**
     * Отображает уведомление на веб-странице и автоматически скрывает его через 2 секунды.
     * @method
     */
    panic() {
        const root = document.getElementById('root');

        const notify = document.createElement('notify');
        setTimeout(() => {
            notify.remove();
        }, 2000);
        notify.innerHTML = this.#message;
        root.appendChild(notify);
    }
}
