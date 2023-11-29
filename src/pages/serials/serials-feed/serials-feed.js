import serial from './serials-feed.hbs';
import store from '../../../..';
import { $sendSerialsCollectionAliasRequest, SERIALS_COLLECTION_REDUCER } from '../../../services/flux/actions/serials-collection';
import { SerialsFeedCollection } from './serials-feed-collections';
import { logoutRequest } from '../../../services/api/auth';
import { navigate } from '../../../services/router/Router';
import { seachHandler } from '../../../services/search-utils';
import { avatarUpdate } from '../../../services/avatar-update';
import { videoHelper } from '../../../services/video-helper';

export class SerialFeedPage {
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
            if (data) {
                new SerialsFeedCollection(root, data.name, data.content, data.id);
            }
        });
    }

    render() {
        store.clearSubscribes();
        this.#parent.innerHTML = '';
        const state = store.getState();
        if (!state || state.serials.serials === null) {
            store.dispatch($sendSerialsCollectionAliasRequest());

            store.subscribe(SERIALS_COLLECTION_REDUCER, () => {
                this.#parent.innerHTML = serial({ 'preview': store.getState().serials.serials[2].content[0], href: `/serial/${store.getState().serials.serials[2].content[0].id}` });
                this.addCollections(store.getState().serials.serials);

                document.getElementById('logout').addEventListener('click', async function () {
                    const response = await logoutRequest();
                    if (response.ok) {
                        navigate('/login');
                    }
                });

                avatarUpdate();
                videoHelper();
                seachHandler();
            });

        } else if (state.serials.serials) {
            this.#parent.innerHTML = serial({ 'preview': state.serials.serials[2].content[0], href: `/serial/${store.getState().serials.serials[2].content[0].id}` });
            this.addCollections(state.serials.serials);
            document.getElementById('logout').addEventListener('click', async function () {
                const response = await logoutRequest();
                if (response.ok) {
                    navigate('/login');
                }
            });

            avatarUpdate();
            videoHelper();
            seachHandler();
        }

    }
}
