import { logoutRequest } from '../../services/api/auth.js';
import { navigate } from '../../services/router/Router.js';
import { FeedCollection } from './components/feed-collection.js';
import feed from './feed-page.hbs';
import store from '../../..';
import { $sendCollectionAliasRequest, COLLECTION_REDUCER } from '../../services/flux/actions/collections.js';
import { seachHandler } from '../../services/search-utils.js';
import { avatarUpdate } from '../../services/avatar-update.js';

/**
 * Класс, представляющий страницу ленты.
 */
export class FeedPage {
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
            new FeedCollection(root, data.name, data.content, data.id);
        });
    }

    /**
     * Рендерит страницу ленты.
     */
    async render() {

        this.#parent.innerHTML = '';

        store.dispatch($sendCollectionAliasRequest());
        store.subscribe(COLLECTION_REDUCER, () => {

            const state = store.getState().collections;
            this.#parent.innerHTML = feed({ 'preview': state.preview, 'id': 'playButton' });
            this.addCollections(state.collections);
            document.getElementById('logout').addEventListener('click', async function () {
                const response = await logoutRequest();
                if (response.ok) {
                    navigate('/login');
                }
            });

            const btn = document.getElementById('playButton');
            btn.addEventListener('click', () => {
                btn.href = '/movies/' + state.preview.id;
            });
            seachHandler();

            avatarUpdate();
        });

        // Получаем поле ввода

        /*if (document.querySelector('iframe')) {
            document.querySelector('iframe').remove();
        }
        if (document.querySelector('iframe')) {
            document.querySelector('iframe').remove();
        }

        const frame = document.createElement('iframe');
        frame.width = '889';
        frame.height = '500';
        frame.src = 'http://localhost:81/csi/feed';
        frame.frameBorder = '0';
        frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        frame.allowFullscreen = true;

        document.body.appendChild(frame);*/

    }
}

