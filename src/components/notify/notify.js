/**
 * Класс для создания уведомлений в веб-приложении.
 */
import notify from './notify.hbs';
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
        const toast = document.getElementById('toasts');
        toast.innerHTML = notify({ message: message });

        setTimeout(() => {
            toast.innerHTML = '';
        }, 80000);

    }
}
