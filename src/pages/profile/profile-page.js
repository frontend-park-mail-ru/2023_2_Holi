import { Notify } from '../../components/notify/notify.js';
import { setUserInfo } from '../../services/api/user.js';
import { validatePassword } from '../../services/validate.js';
import profile from './profile-page.hbs';
import store from '../../../index.js';
import { $sentUserInfoRequest, USER_REDUCER } from '../../services/flux/actions/user-info.js';
import { logoutHandle } from '../../services/logoutHandle.js';
import { checkPaymentLink, getPaymentLink } from '../../services/api/payment.js';
import { closeOnBackDropClick } from '../../components/modal/modal.js';
import { seachHandler } from '../../services/search-utils.js';
/**
 * Класс для отображения страницы профиля пользователя.
 */
export class ProfilePage {
    #parent;
    formData;
    changedFields;

    /**
    * Создает экземпляр класса ProfilePage.
    *
    * @param {HTMLElement} [parent=document.getElementById('root')] - Родительский элемент, в который будет вставлен контент страницы.
    */
    constructor(parent = document.getElementById('root')) {
        this.#parent = parent;
        this.formData = {
            id: Number(localStorage.getItem('userId')),
        };
        this.changedFields = {};
    }

    async render() {
        store.clearSubscribes();
        this.clearParentHtml();
        this.renderProfileTemplate();
        this.configurePaymentLink();
        const profileForm = document.forms['profile-form'];
        const emailInput = profileForm.elements['email'];
        const passwordInput = profileForm.elements['password'];
        const fileInput = profileForm.elements['file'];

        const buttonConfig = document.getElementById('config_profile_btn');
        const dialogConfig = document.getElementById('config_profile_dialog');
        const closeConfig = document.getElementById('config_profile_btn_close');
        dialogConfig.addEventListener('click', closeOnBackDropClick);
        buttonConfig.addEventListener('click', () => {
            dialogConfig.showModal();
        });
        closeConfig.addEventListener('click', () => {
            dialogConfig.close();
        });

        const buttonPayment = document.getElementById('payment_profile_btn');
        const dialogPayment = document.getElementById('payment_profile_dialog');
        dialogPayment.addEventListener('click', closeOnBackDropClick);
        const closePayment = document.getElementById('payment_profile_btn_close');

        buttonPayment.addEventListener('click', () => {
            dialogPayment.showModal();
        });
        closePayment.addEventListener('click', () => {
            dialogPayment.close();
        });
        store.dispatch($sentUserInfoRequest());

        store.subscribe(USER_REDUCER, () => {
            const stateUser = store.getState().user.userInfo;

            if (stateUser) {
                if (document.forms['profile-form']) {
                    const emailInput = document.forms['profile-form'].elements['email'];
                    const avatarElements = document.querySelectorAll('.avatar');

                    if (stateUser.user.email) {
                        emailInput.value = stateUser.user.email;
                        document.getElementById('email-span-js').textContent = stateUser.user.email;
                    }

                    if (stateUser.user.imagePath) {
                        this.updateAvatars(avatarElements, stateUser.user.imagePath);
                    }
                }
            }
        });

        this.setupFileInput(fileInput);
        this.setupEmailInput(emailInput);
        this.setupPasswordInput(passwordInput);

        this.setupFormSubmission(profileForm);
        seachHandler();
        logoutHandle();
    }

    clearParentHtml() {
        this.#parent.innerHTML = '';
    }

    renderProfileTemplate() {
        this.#parent.innerHTML = profile();
    }

    async configurePaymentLink() {
        const paymentLinkElement = document.getElementById('payment');

        const linkResponse = await checkPaymentLink();

        if (linkResponse.body.status) {
            const label = linkResponse.body.subUpTo;
            paymentLinkElement.href = '#';

            const dateObject = new Date(label);

            // Получение компонентов даты
            const day = dateObject.getDate();
            const month = dateObject.getMonth() + 1;
            const year = dateObject.getFullYear();

            // Формирование текста для кнопки
            const buttonText = `Оплата до ${day}.${month}.${year}`;
            paymentLinkElement.textContent = buttonText;
        } else {
            const paymentResponse = await getPaymentLink();
            const label = 'Оплатить';
            paymentLinkElement.href = paymentResponse.body.payment;
            paymentLinkElement.textContent = label;

        }

    }

    setupFormSubmission(profileForm) {
        profileForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            await this.handleFormSubmission(profileForm);
        });
    }

    updateAvatars(avatarElements, imagePath) {
        avatarElements.forEach(avatar => {
            const cacheBuster = Math.random().toString(36).substring(7);
            const updatedImageUrl = imagePath.includes('?')
                ? `${imagePath}&cache=${cacheBuster}`
                : `${imagePath}?cache=${cacheBuster}`;
            avatar.src = updatedImageUrl;
        });
    }

    setupFileInput(fileInput) {
        let file = null;
        fileInput.addEventListener('input', (event) => {
            if (event.target.files[0]) {
                file = event.target.files[0];
                this.processSelectedFile(file, fileInput);
            }
        });
    }

    processSelectedFile(file) {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'webm'];
        const fileName = file.name.toLowerCase();
        const fileExtension = fileName.split('.').pop();
        const ava = document.querySelector('.avatar__edit');

        if (allowedExtensions.includes(fileExtension)) {
            document.querySelector('.input-control__file-text').innerHTML = file.name;

            const reader = new FileReader();

            const nowAva = new FileReader();
            nowAva.readAsDataURL(file);
            nowAva.onload = (e) => {
                ava.src = e.target.result;
            };

            reader.onload = (e) => {
                const arrayBuffer = e.target.result;
                // eslint-disable-next-line no-undef
                const uint8Array = new Uint8Array(arrayBuffer);
                this.changedFields.imageData = true;
                this.formData.imageData = Array.from(uint8Array);
            };

            reader.readAsArrayBuffer(file);
        } else {
            new Notify('Выберите файл с расширением jpg, jpeg или png');
            delete this.formData.imageData;
            delete this.changedFields.imageData;
        }
    }

    setupEmailInput(emailInput) {
        emailInput.addEventListener('input', () => {
            this.handleEmailInput(emailInput);
        });
    }

    handleEmailInput(emailInput) {
        if (emailInput.value && this.formData.email !== emailInput.value) {
            this.formData.email = emailInput.value;
            this.changedFields.email = true;
        } else {
            delete this.formData.email;
            delete this.changedFields.email;
        }
    }

    setupPasswordInput(passwordInput) {
        passwordInput.addEventListener('input', () => {
            this.handlePasswordInput(passwordInput);
        });
    }

    handlePasswordInput(passwordInput) {
        if (passwordInput.value) {
            const newPassword = Array.from(new TextEncoder().encode(passwordInput.value));
            if (this.formData.password !== newPassword) {
                this.formData.password = newPassword;
                this.changedFields.password = true;
            } else {
                delete this.formData.password;
                delete this.changedFields.password;
            }
        } else {
            //new Notify(validatePassword(passwordInput.value));
            delete this.formData.password;
            delete this.changedFields.password;
        }
    }

    async handleFormSubmission(profileForm) {
        const passwordInput = profileForm.elements['password'];
        try {
            if (this.changedFields.password && validatePassword(passwordInput.value).length > 0) {
                new Notify(validatePassword(passwordInput.value));
                passwordInput.value = ''; // Сброс формы после успешной отправки
                this.changedFields = {}; // Очистка измененных полей

                return;
            }
            if (Object.keys(this.changedFields).length > 0) {
                const response = await setUserInfo(this.formData);
                this.handleProfileUpdateResponse(response, profileForm);
                profileForm.reset(); // Сброс формы после успешной отправки
                const dialogConfig = document.getElementById('config_profile_dialog');
                dialogConfig.close();
                this.changedFields = {}; // Очистка измененных полей
                this.formData = {
                    id: Number(localStorage.getItem('userId')),
                };
            } else {
                new Notify('Нет изменений для сохранения');
            }
        } catch (error) {
            new Notify('Произошла ошибка при отправке запроса');
        }
    }

    handleProfileUpdateResponse(response, profileForm) {
        if (response.ok) {
            new Notify('Профиль успешно обновлен');
            store.dispatch($sentUserInfoRequest());
            profileForm.reset();
        } else {
            // Handle error response
        }
    }
}
