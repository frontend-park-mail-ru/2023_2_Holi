/* global Handlebars */
import { rootElement } from '../../../index.js';
import { Notify } from '../../components/notify/notify.js';
import { getUserInfo, setUserInfo } from '../../services/api/user.js';
import EventEmitter from '../../services/store.js';
class ProfilePage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }
    /**
     * Рендерит страницу входа.
     */

    setInput(input, value) {
        if (value) {
            input.value = value;
        } else {
            input.value = '-';
        }
    }
    async render() {
        this.#parent.innerHTML = '';
        document.body.style.background = '#fff';
        const template = Handlebars.templates['profile-page.hbs'];
        this.#parent.innerHTML = template();

        const userInfo = await getUserInfo(localStorage.getItem('userId'));
        console.info(userInfo.body.user);

        const profileForm = document.forms['profile-form'];

        const nameInput = profileForm.elements['username'];
        const emailInput = profileForm.elements['email'];
        const passwordInput = profileForm.elements['password'];
        const fileInput = profileForm.elements['file'];

        this.setInput(emailInput, userInfo.body.user.email);
        let file = null;
        fileInput.addEventListener('change', (event) => {
            if (event.target.files[0]) {
                file = event.target.files[0];
                document.querySelector('.input-control__file-text').innerHTML = event.target.files[0].name;
                const reader = new FileReader();

                reader.onload = (e) => {
                    const arrayBuffer = e.target.result; // Получаем массив байт (ArrayBuffer)
                    const uint8Array = new Uint8Array(arrayBuffer); // Преобразуем его в Uint8Array
                    file = Array.from(uint8Array);
                    // Теперь у вас есть Uint8Array с содержимым файла
                    console.log(Array.from(uint8Array));
                };

                reader.readAsArrayBuffer(file); // Считываем файл как ArrayBuffer
            }
        });
        profileForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)

            // Собираем данные из формы, например:
            const name = nameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;

            // Отправляем запрос на сервер с измененными данными
            try {
                const response = await setUserInfo(Number(localStorage.getItem('userId')), name, email, password, file);
                if (response.ok) {
                    // Обработка успешного ответаArray.from(uint8Array)
                    // Обработка ошибки
                   new Notify('Профиль успешно обновлен');
                }
            } catch (error) {
                console.error('Произошла ошибка при отправке запроса', error);
            }
        });

        document.getElementById('dropdown').addEventListener('click', function () {
            this.parentNode.parentNode.classList.toggle('closed');
        }, false);

        document.querySelector('.avatar').src = '/src/static/img/avatarStatic.jpg';
    }
}

export default new ProfilePage(rootElement);
