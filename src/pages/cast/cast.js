// import { Notify } from '../../components/notify/notify.js';
// import { navigate } from '../../services/router/Router.js';
/*global Handlebars */

import {getGenreFilms} from "../../services/api/genre.js";
import {VideoItem} from "./components/video-item.js";

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

    addCollections(content) {
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
        const Fantasy = await getGenreFilms('Fantasy');
        let content = [];

        if (Fantasy.status === 200) {
            content = Fantasy.body.films;
        }

        this.#parent.innerHTML = '';
        document.body.style.background = '#181818';
        const template = Handlebars.templates['cast.hbs'];
        this.#parent.innerHTML = template();

        this.addCollections(content);


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
