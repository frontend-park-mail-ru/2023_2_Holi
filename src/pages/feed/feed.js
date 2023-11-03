import { logoutRequest } from '../../services/api/auth.js';
import { navigate } from '../../services/router/Router.js';
import { getGenreAlias, getGenreFilms } from '../../services/api/content.js';
import { FeedCollection } from './components/feed-collection.js';
import { rootElement } from '../../../index.js';
import Store from '../../services/store.js';
import { getUserInfo } from '../../services/api/user.js';
/* global Handlebars */
/**
 * Класс, представляющий страницу ленты.
 */
class FeedPage {
    #parent;

    /**
    * Создает новый экземпляр класса FeedPage.
    * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница.
    */
    constructor(parent) {
        this.#parent = parent;
    }

    addCollections(content) {
        const root = document.getElementById('feed-collections');
        root.innerHTML = '';
        content.forEach((data) => {
            new FeedCollection(root, data.title, data.content);
        });

    }
    /**
     * Рендерит страницу ленты.
     */
    async render() {
        this.#parent.innerHTML = '';
        document.body.style.background = '';
        const content = [];

        async function fetchGenreFilms(genre) {
            try {
                const result = await getGenreFilms(genre.name); // Используйте genre.name вместо просто genre
                if (result.body.films) {
                    content.push({ title: genre.name, content: result.body.films });
                }
            } catch (error) {
                // Обработка ошибки (можно добавить логирование или другие действия)
            }
        }

        const genres = await getGenreAlias();
        //TODO нужно обрабатывать случвй, когда genres пустой
        const genrePromises = genres.body.genres.map(genre => fetchGenreFilms(genre));

        await Promise.all(genrePromises);

        console.info(content);
        const template = Handlebars.templates['feed-page.hbs'];
        this.#parent.innerHTML = template();
        const userInfo = await getUserInfo(localStorage.getItem('userId'));
        if (userInfo.body.user.imagePath) {
            setTimeout(() => {
                document.querySelector('.avatar').src = userInfo.body.user.imagePath;
            }, 0);
        }
        if (content.length) {
            this.addCollections(content);
        }

        document.getElementById('logout').addEventListener('click', async function () {
            const response = await logoutRequest();
            if (response.ok) {
                navigate('/login');
            }
        });

        document.getElementById('dropdown').addEventListener('click', function () {
            this.parentNode.parentNode.classList.toggle('closed');
        }, false);

    }
}

export default new FeedPage(rootElement);
