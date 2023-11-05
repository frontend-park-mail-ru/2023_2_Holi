/* global Handlebars */
/**
 * Класс для создания уведомлений в веб-приложении.
 */
export class Notify {

    /**
     * Создает экземпляр класса Notify с заданным сообщением.
     * @param {string} message - Сообщение для отображения в уведомлении.
     */
    constructor(message) {
        this.render(message);
    }

    clear(parent){
        parent.innerHTML = '';
    }

    render(message) {
        const template = Handlebars.templates['notify.hbs'];
        const toast = document.getElementById('toasts');
        toast.innerHTML = template({ message: message });

        setTimeout(() => {
            toast.innerHTML = '';
        }, 8000);

    }
}
