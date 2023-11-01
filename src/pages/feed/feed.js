import { logoutRequest } from '../../services/api/auth.js';
import { navigate } from '../../services/router/Router.js';
import { getGenreFilms } from '../../services/api/content.js';
import { FeedCollection } from './components/feed-collection.js';
import { rootElement } from '../../../index.js';
import Store from '../../services/store.js';
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

       /* async function fetchGenreFilms(genre) {
            try {
                const result = await getGenreFilms(genre);
                if (result.status === 200) {
                    content.push({ title: genre, content: result.body.films });
                }
            } catch (error) {
                // Обработка ошибки (можно добавить логирование или другие действия)
            }
        }*/

        /*await Promise.all([
            fetchGenreFilms('Drama'),
            fetchGenreFilms('Fantasy'),
            fetchGenreFilms('Horror'),
            fetchGenreFilms('Action'),
            fetchGenreFilms('Thriller'),
            fetchGenreFilms('Comedy'),
            fetchGenreFilms('Romance'),
            fetchGenreFilms('Crime'),
        ]);*/

        const template = Handlebars.templates['feed-page.hbs'];
        this.#parent.innerHTML = template();

        if (content.length) {
            this.addCollections(content);
            Store.registerAction('saveContent', (state, content) => {
                return { feedContent: content };
            });
            Store.commit('saveContent', { content, loaded: true });
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
