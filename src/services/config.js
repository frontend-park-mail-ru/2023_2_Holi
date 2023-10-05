/**
 * Конфигурационный объект для различных компонентов и страниц приложения.
 * @namespace
 */
export const config = {
    whiteHeader: {
        headerContent: {
            classes: ['header-content-reg'],
        },
    },
    finishAcc: {
        stepHeader: {
            span: {
                classes: ['step-indicator-finish-acc'],
            },
            header: {
                classes: ['step-header-finish-acc'],
                text: 'Завершите настройку своего аккаунта',
            },
        },
        registerContextBody: {
            classes: ['context-body'],
            text: 'Netflix создан специально для вас. Создайте пароль, чтобы начать просмотр Netflix.',
        },
    },
    createPassword: {
        stepHeader: {
            span: {
                classes: ['step-indicator-create-password'],
            },
            header: {
                classes: ['step-header-create-password'],
                text: 'Создайте пароль, чтобы присоединиться к Netflix',
            },
        },
        upperContextBody: {
            text: 'Еще несколько шагов, и все готово!',
        },
        lowerContextBody: {
            text: 'Мы тоже ненавидим бумажную волокиту.',
        },
        formList: {
            classes: ['form-list-create-password'],
            withHeader: false,
            inputs: [{
                inputClasses: ['form-input-create-password'],
                containerClasses: ['input-container-create-password'],
                placeholder: 'Введите почту',
                type: 'email',
            },
            {
                inputClasses: ['form-input-create-password'],
                containerClasses: ['input-container-create-password'],
                placeholder: 'Введите пароль',
                type: 'password',
            },
            ],
        },
    },
    alreadyCreated: {
        stepHeader: {
            span: {
                classes: ['step-indicator-create-password'],
            },
            header: {
                classes: ['step-header-create-password'],
                text: 'С возвращением!\nПрисоединиться к Netflix очень просто.',
            },
        },
        contextBody: {
            text: 'Введите свой пароль, и вы сразу же начнете просмотр.',
        },
        formList: {
            classes: ['form-list-already-created'],
            withHeader: true,
            headerStub: {
                text: 'Email',
                classes: [],
            },
            header: {
                text: 'ax.chinaev@yandex.ru',
                classes: ['bold'],
            },
            inputs: [{
                inputClasses: ['form-input-already-created'],
                containerClasses: ['input-container-already-created'],
                placeholder: 'Введите пароль',
                type: 'password',
            }],
        },
    },
};
