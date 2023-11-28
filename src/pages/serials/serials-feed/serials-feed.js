import serial from './serials-feed.hbs';
import store from '../../../..';
import { $sendSerialsCollectionAliasRequest, SERIALS_COLLECTION_REDUCER } from '../../../services/flux/actions/serials-collection';
import { SerialsFeedCollection } from './serials-feed-collections';
import { logoutRequest } from '../../../services/api/auth';
import { navigate } from '../../../services/router/Router';
import { seachHandler } from '../../../services/search-utils';
import { avatarUpdate } from '../../../services/avatar-update';

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
        this.#parent.innerHTML = '';
        this.#parent.innerHTML = serial();
        const state = store.getState();
        console.log(state);
        if (!state || state.serials.serials === null) {
            store.dispatch($sendSerialsCollectionAliasRequest());

            store.subscribe(SERIALS_COLLECTION_REDUCER, () => {
                this.addCollections(store.getState().serials.serials);
            });

            document.getElementById('logout').addEventListener('click', async function () {
                const response = await logoutRequest();
                if (response.ok) {
                    navigate('/login');
                }
            });
        } else if (state.serials.serials) {
            this.addCollections(state.serials.serials);
        }

        avatarUpdate();

        seachHandler();
    }
}
