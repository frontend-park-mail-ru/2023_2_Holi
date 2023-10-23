import { logoutRequest } from '../../services/api/auth.js';
import { navigate } from '../../services/router/Router.js';
import { getGenreFilms } from '../../services/api/genre.js';
import { FeedCollection } from './components/feed-collection.js';

/* global Handlebars */
/**
 * Класс, представляющий страницу ленты.
 */
export class FeedPage {
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

        const Drama = await getGenreFilms('Drama');
        const Fantasy = await getGenreFilms('Fantasy');
        const Horror = await getGenreFilms('Horror');
        const Action = await getGenreFilms('Action');
        const Thriller = await getGenreFilms('Thriller');
        const Comedy = await getGenreFilms('Comedy');
        const Romance = await getGenreFilms('Romance');
        const Crime = await getGenreFilms('Crime');

        const content = [];
        if (Drama.status === 200) {
            content.push({title: 'Драмы',content: Drama.body.films});
        }

        if (Fantasy.status === 200) {
            content.push({ title: 'Фэнтези', content: Fantasy.body.films });
        }

        if (Horror.status === 200) {
            content.push({ title: 'Ужасы', content: Horror.body.films });
        }

        if (Action.status === 200) {
            content.push({ title: 'Экшены', content: Action.body.films });
        }

        if (Thriller.status === 200) {
            content.push({ title: 'Триллеры', content: Thriller.body.films });
        }

        if (Comedy.status === 200) {
            content.push({ title: 'Комедии', content: Comedy.body.films });
        }

        if (Romance.status === 200) {
            content.push({ title: 'Мелодрамы', Romance: Action.body.films });
        }

        if (Crime.status === 200) {
            content.push({ title: 'Детективы', content: Crime.body.films });
        }

        const template = Handlebars.templates['feed-page.hbs'];
        this.#parent.innerHTML = template();

        this.addCollections(content);

        document.getElementById('logout').addEventListener('click', async function() {
            const response = await logoutRequest();
            if (response.ok) {
                navigate('/login');
            }
        });

        document.getElementById('dropdown').addEventListener('click', function() {
            this.parentNode.parentNode.classList.toggle('closed');
        }, false);
    }
}
