import { Notify } from '../../components/notify/notify.js';
import { logoutRequest } from '../../services/api/auth.js';
import { getUserInfo, setUserInfo } from '../../services/api/user.js';
import { navigate } from '../../services/router/Router.js';
//import { validatePassword } from '../../services/validate.js';
import profile from './profile-page.hbs';

import store from '../../../index.js';
import { $sentUserInfoRequest } from '../../services/flux/actions/user-info.js';
import { getCheckSurvey } from '../../services/api/iframe.js';

export class ProfilePage {
    #parent;
    constructor(parent = document.getElementById('root')) {
        this.#parent = parent;
    }

    async render() {

        const userInfo = await getUserInfo(localStorage.getItem('userId'));
        this.#parent.innerHTML = '';
        this.#parent.innerHTML = profile();
        const profileForm = document.forms['profile-form'];
        const emailInput = profileForm.elements['email'];
        const passwordInput = profileForm.elements['password'];
        const fileInput = profileForm.elements['file'];

        /**
         * Узнаю о пользователе
         */
        store.dispatch($sentUserInfoRequest());

        /**
         * Подписка сраюотает при изменении стора
         */
        store.subscribe(() => {
            console.info(store.getState().user);
            const stateUser = store.getState().user.userInfo;
            if (stateUser) {
                if (stateUser.user.email) {
                    emailInput.value = stateUser.user.email;
                }
                if (stateUser.user.imagePath.length > 0) {
                    console.info(document.querySelectorAll('img[data-avatar]'));
                }

            }

        });
        if (userInfo.body.user.imagePath) {
            setTimeout(() => {
                profileForm.reset();
                emailInput.value = userInfo.body.user.email;
                document.querySelector('.avatar').src = userInfo.body.user.imagePath;
            }, 0);
        }

        let file = null;
        fileInput.addEventListener('change', (event) => {
            if (event.target.files[0]) {
                file = event.target.files[0];
                const allowedExtensions = ['jpg', 'jpeg', 'png'];
                const fileName = file.name.toLowerCase();
                const fileExtension = fileName.split('.').pop();

                if (allowedExtensions.includes(fileExtension)) {
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
                else {
                    new Notify('Выберите файл с расширением jpg, jpeg или png');
                }
            }
        });
        const formData = {
            id: Number(localStorage.getItem('userId')),
        };

        // Добавьте обработчики событий на соответствующие инпуты

        emailInput.addEventListener('change', () => {
            if (emailInput.value) {
                formData.email = emailInput.value;
            }
        });
        passwordInput.addEventListener('change', () => {
            if (passwordInput.value) {
                formData.password = Array.from(new TextEncoder().encode(passwordInput.value));
            }
        });
        // fileInput.addEventListener('change', () => { formData.imageData = file; });
        profileForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)

            try {

                const response = await setUserInfo(formData);
                profileForm.reset();
                emailInput.addEventListener('change', () => {
                    if (emailInput.value) {
                        formData.email = emailInput.value;
                    }
                });
                passwordInput.addEventListener('change', () => {
                    if (passwordInput.value) {
                        formData.password = Array.from(new TextEncoder().encode(passwordInput.value));
                    }
                });
                // // fileInput.addEventListener('change', () => { formData.imageData = file; });
                // formData = {
                //     id: Number(localStorage.getItem('userId')),
                // };
                if (response.ok) {
                    // Обработка успешного ответаArray.from(uint8Array)
                    // Обработка ошибки
                    new Notify('Профиль успешно обновлен');

                    if (document.querySelector('iframe')) {
                        document.querySelector('iframe').remove();
                    }
                    const access = await getCheckSurvey('csi_profile');
                    if (access.body.passed === 'false') {
                        const frame = document.createElement('iframe');
                        frame.width = '889';
                        frame.height = '500';
                        frame.src = 'http://localhost:4510/csi_profile';
                        frame.frameBorder = '0';
                        frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                        frame.allowFullscreen = true;

                        document.body.appendChild(frame);
                    }

                    await getUserInfo(Number(localStorage.getItem('userId')));
                }
            } catch (error) {
                new Notify('Произошла ошибка при отправке запроса');
            }
        });

        document.getElementById('logout').addEventListener('click', async function () {
            const response = await logoutRequest();
            if (response.ok) {
                navigate('/login');
            }
        });
    }
}
