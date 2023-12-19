import { Notify } from '../../components/notify/notify.js';
import { setUserInfo } from '../../services/api/user.js';
import { validatePassword } from '../../services/validate.js';
import profile from './profile-page.hbs';
import store from '../../../index.js';
import { $sentUserInfoRequest, USER_REDUCER } from '../../services/flux/actions/user-info.js';
import { logoutHandle } from '../../services/logoutHandle.js';
import { checkPaymentLink, getPaymentLink } from '../../services/api/payment.js';
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

        const profileForm = document.forms['profile-form'];
        const emailInput = profileForm.elements['email'];
        const passwordInput = profileForm.elements['password'];
        const fileInput = profileForm.elements['file'];

        store.dispatch($sentUserInfoRequest());

        store.subscribe(USER_REDUCER, () => {
            const stateUser = store.getState().user.userInfo;

            if (stateUser) {
                const emailInput = document.forms['profile-form'].elements['email'];
                const avatarElements = document.querySelectorAll('.avatar');

                if (stateUser.user.email) {
                    emailInput.value = stateUser.user.email;
                }

                if (stateUser.user.imagePath) {
                    this.updateAvatars(avatarElements, stateUser.user.imagePath);
                }
            }
        });

        this.setupFileInput(fileInput);
        this.setupEmailInput(emailInput);
        this.setupPasswordInput(passwordInput);

        this.setupFormSubmission(profileForm);

        logoutHandle();
    }

    clearParentHtml() {
        this.#parent.innerHTML = '';
    }

    renderProfileTemplate() {
        this.#parent.innerHTML = profile();
    }

    configurePaymentLink() {
        const paymentLinkElement = document.getElementById('payment');

        checkPaymentLink()
            .then(res => {
                if (res.ok && res.body.status) {
                    const label = res.body.subUpTo;
                    paymentLinkElement.href = '#';
                    paymentLinkElement.textContent = label;
                } else {
                    getPaymentLink()
                        .then(res => {
                            if (res.ok) {
                                const label = 'Оплатить';
                                paymentLinkElement.href = res.body.payment;
                                paymentLinkElement.textContent = label;
                            }
                        });
                }

            });
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
        const ava = document.querySelector('.avatar-preview');

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
        if (passwordInput.value && validatePassword(passwordInput.value) === '') {
            const newPassword = Array.from(new TextEncoder().encode(passwordInput.value));
            if (this.formData.password !== newPassword) {
                this.formData.password = newPassword;
                this.changedFields.password = true;
            } else {
                delete this.formData.password;
                delete this.changedFields.password;
            }
        } else {
            new Notify(validatePassword(passwordInput.value));
            delete this.formData.password;
            delete this.changedFields.password;
        }
    }

    async handleFormSubmission(profileForm) {
        try {
            if (Object.keys(this.changedFields).length > 0) {
                const response = await setUserInfo(this.formData);
                this.handleProfileUpdateResponse(response, profileForm);
                profileForm.reset(); // Сброс формы после успешной отправки
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
