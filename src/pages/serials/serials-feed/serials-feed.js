import serial from './serials-feed.hbs';
import store from '../../../..';
import { $sendSerialsCollectionAliasRequest, SERIALS_COLLECTION_REDUCER } from '../../../services/flux/actions/serials-collection';
import { SerialsFeedCollection } from './serials-feed-collections';
import { seachHandler } from '../../../services/search-utils';
import { avatarUpdate } from '../../../services/avatar-update';
import { logoutHandle } from '../../../services/logoutHandle';
/**
 * Класс для отображения страницы ленты сериалов.
 */
export class SerialFeedPage {
    #parent;

    /**
     * Создает новый экземпляр класса SerialFeedPage.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница.
     */
    constructor(parent) {
        this.#parent = parent;
    }
/**
     * Добавляет коллекции на страницу.
     * @param {Array} content - Массив данных о коллекциях.
     */
    addCollections(content) {
        const root = document.getElementById('feed-collections');
        root.innerHTML = '';
        content.forEach((data) => {
            if (data) {
                new SerialsFeedCollection(root, data.name, data.content, data.id);
            }
        });
    }
/**
     * Рендерит страницу ленты сериалов.
     */
    render() {
        store.clearSubscribes();
        this.#parent.innerHTML = '';
        const state = store.getState();
        if (!state || state.serials.serials === null) {
            store.dispatch($sendSerialsCollectionAliasRequest());

            store.subscribe(SERIALS_COLLECTION_REDUCER, () => {
                this.#parent.innerHTML = serial({ 'preview': store.getState().serials.preview });
                this.addCollections(store.getState().serials.serials);

                logoutHandle();
                const btn = document.querySelector('.btn-action');
                btn.addEventListener('click', () => {
                    btn.href = '/serial/' + store.getState().serials.preview.id;
                });
                avatarUpdate();
                seachHandler();
            });

        } else if (state.serials.serials) {
            this.#parent.innerHTML = serial({ 'preview':  store.getState().serials.preview });
            this.addCollections(state.serials.serials);
            logoutHandle();
            const btn = document.querySelector('.btn-action');
            btn.addEventListener('click', () => {
                btn.href = '/serial/' + store.getState().serials.preview.id;
            });
            avatarUpdate();
            seachHandler();
        }

    }
}
