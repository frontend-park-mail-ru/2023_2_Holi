/* global Handlebars */
import { rootElement } from '../../../index.js';
import { Notify } from '../../components/notify/notify.js';
import { logoutRequest } from '../../services/api/auth.js';
import { getUserInfo, setUserInfo } from '../../services/api/user.js';
import { navigate } from '../../services/router/Router.js';
import EventEmitter from '../../services/store.js';
import { validatePassword } from '../../services/validate.js';

class ProfilePage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    setInput(input, value) {
        if (value) {
            input.value = value;
        } else {
            input.value = '-';
        }
    }
    async render() {
        const userInfo = await getUserInfo(localStorage.getItem('userId'));
        this.#parent.innerHTML = '';
        document.body.style.background = '#fff';
        const template = Handlebars.templates['profile-page.hbs'];
        this.#parent.innerHTML = template();
        const profileForm = document.forms['profile-form'];
        const nameInput = profileForm.elements['username'];
        const emailInput = profileForm.elements['email'];
        const passwordInput = profileForm.elements['password'];
        const fileInput = profileForm.elements['file'];

        setTimeout(() => profileForm.reset(), 300);

        if (userInfo.body.user.imagePath) {
            setTimeout(() => {
                profileForm.reset();
                nameInput.value = userInfo.body.user.name;
                emailInput.value = userInfo.body.user.email;
                document.querySelector('.avatar').src = userInfo.body.user.imagePath;
            }, 0);
        }

        EventEmitter.on('getUserData', (data) => {
            setTimeout(() => document.querySelector('.avatar').src = data.body.user.imagePath, 0);
        });

        this.setInput(emailInput, userInfo.body.user.email);
        let file = null;
        fileInput.addEventListener('change', (event) => {
            if (event.target.files[0]) {
                file = event.target.files[0];
                document.querySelector('.input-control__file-text').innerHTML = event.target.files[0].name;
                const reader = new FileReader();

                reader.onload = (e) => {
                    const arrayBuffer = e.target.result; // Получаем массив байт (ArrayBuffer)
                    // eslint-disable-next-line no-undef
                    const uint8Array = new Uint8Array(arrayBuffer); // Преобразуем его в Uint8Array
                    formData.imageData = Array.from(uint8Array);

                };

                reader.readAsArrayBuffer(file); // Считываем файл как ArrayBuffer
            }
        });
        let formData = {
            id: Number(localStorage.getItem('userId')),
        };

        // Добавьте обработчики событий на соответствующие инпуты

        // nameInput.addEventListener('change', (e) => {
            if (nameInput.value) {
                formData.name = nameInput.value;
            }
        // });
        // emailInput.addEventListener('change', () => {
            if (emailInput.value) {
                formData.email = emailInput.value;
            }
        // });
        // passwordInput.addEventListener('change', () => {
            if (passwordInput.value) {
                formData.password = Array.from(new TextEncoder().encode(passwordInput.value));
            }
        // });
        // fileInput.addEventListener('change', () => { formData.imageData = file; });
        profileForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)

            try {

                const response = await setUserInfo(formData);
                profileForm.reset();
                // nameInput.addEventListener('change', (e) => {
                //     if (nameInput.value) {
                //         formData.name = nameInput.value;
                //     }
                // });
                // emailInput.addEventListener('change', () => {
                //     if (emailInput.value) {
                //         formData.email = emailInput.value;
                //     }
                // });
                // passwordInput.addEventListener('change', () => {
                //     if (passwordInput.value) {
                //         formData.password = Array.from(new TextEncoder().encode(passwordInput.value));
                //     }
                // });
                // // fileInput.addEventListener('change', () => { formData.imageData = file; });
                // formData = {
                //     id: Number(localStorage.getItem('userId')),
                // };
                if (response.ok) {
                    // Обработка успешного ответаArray.from(uint8Array)
                    // Обработка ошибки
                    new Notify('Профиль успешно обновлен');

                    await getUserInfo(Number(localStorage.getItem('userId')));
                }
            } catch (error) {
                console.error('Произошла ошибка при отправке запроса', error);
            }
        });

        document.getElementById('dropdown').addEventListener('click', function () {
            this.parentNode.parentNode.classList.toggle('closed');
        }, false);

        document.getElementById('logout').addEventListener('click', async function () {
            const response = await logoutRequest();
            if (response.ok) {
                navigate('/login');
            }
        });

        document.querySelector('.avatar').src = '/src/static/img/avatarStatic.jpg';
    }
}

export default new ProfilePage(rootElement);
