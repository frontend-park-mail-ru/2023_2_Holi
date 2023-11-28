import store from '../../..';
import { $sendCollectionAliasRequest, COLLECTION_REDUCER } from '../../services/flux/actions/collections';
import { $sentUserInfoRequest, USER_REDUCER } from '../../services/flux/actions/user-info';
import { getLastNumber } from '../../services/getParams';
import { seachHandler } from '../../services/search-utils';
import genre from './genre.hbs';

/**
 * Класс, представляющий страницу члена съёмочной группы.
 */
export class GenrePage {
    #parent;

    /**
     * Создает новый экземпляр класса CastPage.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница.
     */
    constructor(parent = document.getElementById('root')) {
        this.#parent = parent;
    }

    ratingFillColor() {
        // Получите все элементы с рейтингом
        const ratingElements = document.querySelectorAll('.feed-collection__advanced-info__rating');
        // Переберите элементы и добавьте классы в зависимости от значения рейтинга
        ratingElements.forEach(element => {
            const rating = parseInt(element.getAttribute('data-rating'), 10);

            if (rating >= 7) {
                element.classList.add('rating-high');
            } else if (rating >= 4) {
                element.classList.add('rating-medium');
            } else {
                element.classList.add('rating-low');
            }
        });
    }

    /**
     * Рендерит страницу.
     */
    async render() {
        const id = getLastNumber(location.href);
        const state = store.getState();
        if (!state) {
            store.dispatch($sendCollectionAliasRequest());
            store.subscribe(COLLECTION_REDUCER, () => {
                const startContent = store.getState().collections.collections.find(obj => obj.id === Number(id));
                const roundedMovies = startContent.content.map(movie => {
                    // Используйте метод toFixed, чтобы округлить значение до 1 знака после запятой
                    const roundedRating = parseFloat(movie.rating.toFixed(1));
                    // Создайте новый объект с округленным значением rating

                    return { ...movie, rating: roundedRating };
                });
                console.info(startContent);
                this.#parent.innerHTML = '';

                this.#parent.innerHTML = genre({
                    title: startContent.name,
                    content: roundedMovies,
                });
                this.ratingFillColor();

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
                    if (stateUser) {
                        if (stateUser.user.imagePath) {
                            document.querySelector('.avatar').src = stateUser.user.imagePath;
                        }

                    }

                });
            });
        } else {
            const startContent = state.collections.collections.find(obj => obj.id === Number(id));

            const roundedMovies = startContent.content.map(movie => {
                // Используйте метод toFixed, чтобы округлить значение до 1 знака после запятой
                const roundedRating = parseFloat(movie.rating.toFixed(1));
                // Создайте новый объект с округленным значением rating

                return { ...movie, rating: roundedRating };
            });
            console.info(startContent);
            this.#parent.innerHTML = '';

            this.#parent.innerHTML = genre({
                title: startContent.name,
                content: roundedMovies,
            });
            this.ratingFillColor();

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
                if (stateUser) {
                    if (stateUser.user.imagePath) {
                        document.querySelector('.avatar').src = stateUser.user.imagePath;
                    }

                }

            });
        }
        seachHandler();

    }
}
