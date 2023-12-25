import { logoutRequest } from './api/auth';
import { navigate } from './router/Router';
/**
 * Обработчик выхода из системы.
 * Привязывает событие click ко всем элементам с классом 'logout'.
 */
export const logoutHandle = () => {
    document.querySelectorAll('.logout').forEach(btn => {
        if (btn) {
            /**
    * Обработчик события click, вызывающий процесс выхода из системы при нажатии на элемент с классом 'logout'.
    *
    * @param {MouseEvent} event - Событие click.
    * @returns {Promise<void>} - Промис, который завершается после выполнения запроса на выход из системы.
    */
            btn.addEventListener('click', async function() {
                const response = await logoutRequest();
                if (response.ok) {
                    navigate('/login');
                }
            });
        }
    });
};
