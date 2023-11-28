/**
 * /v1/series/genre/{genre}
/v1/series/{id}
/v1/series/cast/{id}
 */
import serial from './serials-feed.hbs';
import store from '../../../..';
import { $sendSerialsCollectionAliasRequest, SERIALS_COLLECTION_REDUCER } from '../../../services/flux/actions/serials-collection';
import { SerialsFeedCollection } from './serials-feed-collections';
import { logoutRequest } from '../../../services/api/auth';
import { navigate } from '../../../services/router/Router';
import { seachHandler } from '../../../services/search-utils';
import { $sentUserInfoRequest, USER_REDUCER } from '../../../services/flux/actions/user-info';

export class SerialFeedPage {
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
            if (data) {
                new SerialsFeedCollection(root, data.name, data.content);
            }
        });
    }

    render() {
        this.#parent.innerHTML = '';
        this.#parent.innerHTML = serial();

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

         /**/
            /**
            * Узнаю о пользователе
            */
            store.dispatch($sentUserInfoRequest());

            /**
             * Подписка сраюотает при изменении стора
             */
            store.subscribe(USER_REDUCER, () => {
                const stateUser = store.getState().user.userInfo;
                console.info(stateUser)
                if (stateUser) {
                    if (stateUser.user.imagePath) {
                        document.querySelector('.avatar').src = stateUser.user.imagePath;
                    }

                }

            });

        seachHandler();
    }
}
