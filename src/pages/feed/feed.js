import {logoutRequest} from '../../services/api/auth.js';
import {navigate} from '../../services/router/Router.js';
import {getGenreAlias, getGenreFilms, getTopRated} from '../../services/api/content.js';
import {FeedCollection} from './components/feed-collection.js';
import {rootElement} from '../../../index.js';
import {getUserInfo} from '../../services/api/user.js';

import feed from './feed-page.hbs';

/**
 * Класс, представляющий страницу ленты.
 */
class FeedPage {
    #parent;

    /**
    * Создает новый экземпляр класса FeedPage.
    * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница.
    */
    constructor(parent = document.getElementById('root')) {
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
                    content.push({title: genre.name, content: result.body.films});
                }
            } catch (error) {
                // Обработка ошибки (можно добавить логирование или другие действия)
            }
        }

        const genres = await getGenreAlias();
        //TODO нужно обрабатывать случвй, когда genres пустой
        const genrePromises = genres.body.genres.map(genre => fetchGenreFilms(genre));

        // eslint-disable-next-line no-undef
        await Promise.all(genrePromises);

        console.info(content);
        const preview = (await getTopRated()).body.film;

        this.#parent.innerHTML = feed({'preview': preview, 'id': 'playButton'});
        const userInfo = await getUserInfo(localStorage.getItem('userId'));

        if (userInfo.body.user.imagePath.length) {
            setTimeout(() => {
                document.querySelector('.avatar').src = userInfo.body.user.imagePath;
            }, 0);
        } else {
            setTimeout(() => {
                document.querySelector('.avatar').src = 'img/avatarStatic.jpg';
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

        const btn = document.getElementById('playButton')
        btn.addEventListener('click', () => {
            btn.href = '/movies/' + preview.id
        })
    }
}

export default new FeedPage(rootElement);

