import { Notify } from '../../components/notify/notify.js';
import { logoutRequest } from '../../services/api/auth.js';
import { setUserInfo } from '../../services/api/user.js';
import { navigate } from '../../services/router/Router.js';
import { validatePassword } from '../../services/validate.js';
import profile from './profile-page.hbs';
import store from '../../../index.js';
import { $sentUserInfoRequest, USER_REDUCER } from '../../services/flux/actions/user-info.js';

export class ProfilePage {
    #parent;
    constructor(parent = document.getElementById('root')) {
        this.#parent = parent;
    }

    async render() {
        store.clearSubscribes();
        this.#parent.innerHTML = '';
        this.#parent.innerHTML = profile();

        const emailInput = document.querySelector('#emailInput');
        const passwordInput = document.querySelector('#passwordInput');
        const fileInput = document.querySelector('#fileInput');

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
                        setUserInfo({
                            id: Number(localStorage.getItem('userId')),
                            imageData: Array.from(uint8Array),
                        }).then(res => {
                            if (res.ok) {
                                new Notify('Профиль успешно обновлен');
                                store.dispatch($sentUserInfoRequest());
                            }
                        });
                    };

                    reader.readAsArrayBuffer(file); // Считываем файл как ArrayBuffer
                }
                else {
                    new Notify('Выберите файл с расширением jpg, jpeg или png');
                }
            }
        });

        // Добавьте обработчики событий на соответствующие инпуты
        const emailSubmit = document.querySelector('#submitEmail');
        emailSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            setUserInfo({
                id: Number(localStorage.getItem('userId')),
                email: emailInput.value,
            }).then(res => {
                if (res.ok) {
                    new Notify('Профиль успешно обновлен');
                    store.dispatch($sentUserInfoRequest());
                }
            });
        });

        const passwordSubmit = document.querySelector('#submitPassword');
        passwordSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            if (passwordInput.value && validatePassword(passwordInput.value) === '') {
                setUserInfo({
                    id: Number(localStorage.getItem('userId')),
                    password: Array.from(new TextEncoder().encode(passwordInput.value)),
                }).then(res => {
                    if (res.ok) {
                        new Notify('Профиль успешно обновлен');
                        store.dispatch($sentUserInfoRequest());
                    }
                });
            }
            else {
                new Notify(validatePassword(passwordInput.value));
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
