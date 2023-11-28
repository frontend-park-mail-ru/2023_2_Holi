import { Notify } from '../../components/notify/notify.js';
import { logoutRequest } from '../../services/api/auth.js';
import { getUserInfo, setUserInfo } from '../../services/api/user.js';
import { navigate } from '../../services/router/Router.js';
//import { validatePassword } from '../../services/validate.js';
import profile from './profile-page.hbs';
import store from '../../../index.js';
import { $sentUserInfoRequest, USER_REDUCER } from '../../services/flux/actions/user-info.js';

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
        store.subscribe(USER_REDUCER, () => {
            const stateUser = store.getState().user.userInfo;
            if (stateUser) {
                if (stateUser.user.email) {
                    emailInput.value = stateUser.user.email;
                }
                if (stateUser) {
                    if (stateUser.user.imagePath) {
                        document.querySelectorAll('.avatar').forEach(avatar => {
                            // Генерация случайного параметра для обхода кеша
                            const cacheBuster = Math.random().toString(36).substring(7);

                            // Формирование URL с cache-busting параметром
                            const updatedImageUrl = stateUser.user.imagePath.includes('?')
                                ? `${stateUser.user.imagePath}&cache=${cacheBuster}`
                                : `${stateUser.user.imagePath}?cache=${cacheBuster}`;
                            avatar.src = updatedImageUrl;
                        });
                    }
                }
            }
        });

        let file = null;
        fileInput.addEventListener('change', (event) => {
            if (event.target.files[0]) {
                file = event.target.files[0];
                const allowedExtensions = ['jpg', 'jpeg', 'png'];
                const fileName = file.name.toLowerCase();
                const fileExtension = fileName.split('.').pop();
                const ava = document.querySelector('.avatar-preview');
                if (allowedExtensions.includes(fileExtension)) {
                    document.querySelector('.input-control__file-text').innerHTML = event.target.files[0].name;
                    const reader = new FileReader();

                    const nowAva = new FileReader();
                    nowAva.readAsDataURL(file);
                    nowAva.onload = (e) => {
                        ava.src = e.target.result;
                    };
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
                    store.dispatch($sentUserInfoRequest());

                    /*if (document.querySelector('iframe')) {
                        document.querySelector('iframe').remove();
                    }
                    const access = await getCheckSurvey('csi_profile');
                    console.info(access.body.passed)
                    if (access.body.passed == false) {
                        console.info("test")
                        const frame = document.createElement('iframe');
                        frame.width = '889';
                        frame.height = '500';
                        frame.src = 'http://localhost:81/csi_profile';
                        frame.frameBorder = '0';
                        frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                        frame.allowFullscreen = true;

                        document.body.appendChild(frame);
                    }*/
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
