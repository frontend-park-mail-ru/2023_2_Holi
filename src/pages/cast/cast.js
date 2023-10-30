/*global Handlebars */

import {VideoItem} from "./components/video-item.js";
import {getLastNumber} from "../../services/getParams.js";
import {getContentByCastId} from "../../services/api/content.js";

/**
 * Класс, представляющий страницу члена съёмочной группы.
 */
export class CastPage {
    #parent;

    /**
     * Создает новый экземпляр класса CastPage.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница.
     */
    constructor(parent) {
        this.#parent = parent;
    }

    addVideoCard(content) {
        const root = document.getElementById('cast-page');
        root.innerHTML = '';
        content.forEach((data) => {
            new VideoItem(root, data);
        });

    }

    /**
     * Рендерит страницу.
     */
    async render() {
        const id = getLastNumber(location.href);

        const filmsByCast = await getContentByCastId(id);
        let content = [];
        let castName;
        // if (filmsByCast.status === 200) {
            content = filmsByCast.films;
            castName = filmsByCast.cast.name
        // }

        this.#parent.innerHTML = '';
        document.body.style.background = '#181818';
        const template = Handlebars.templates['cast.hbs'];
        this.#parent.innerHTML = template({
            name: castName,
        });

        this.addVideoCard(content);


        // loginContoller();
    }
}

/**
 * Функция-контроллер для обработки событий на странице входа.
 */
// const loginContoller = () => {
//     const loginForm = document.forms['loginForm'];
//     const emailInput = loginForm.elements['email'];
//     const passwordInput = loginForm.elements['password'];
//
//     loginForm.addEventListener('submit', async function(event) {
//         event.preventDefault();
//
//         const email = emailInput.value;
//         const password = passwordInput.value;
//
//         try {
//             if (email && password) {
//                 const response = await loginRequest(email, password);
//                 if (response.ok) {
//                     navigate('/feed');
//                 } else {
//                     new Notify('Неверный логин или пароль');
//                     console.error('Ошибка аутентификации:\n', response.statusText);
//
//                     return;
//                 }
//             } else {
//                 new Notify('Не ввели данные для входа');
//
//                 return;
//             }
//         } catch (error) {
//             new Notify('Упс... Что то пошло не так :(');
//             console.error('Ошибка аутентификации:');
//         }
//     });
// };
