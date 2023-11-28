import store from '../../../..';
import { avatarUpdate } from '../../../services/avatar-update';
import { $sendSerialsCollectionAliasRequest, SERIALS_COLLECTION_REDUCER } from '../../../services/flux/actions/serials-collection';
import { $sentUserInfoRequest, USER_REDUCER } from '../../../services/flux/actions/user-info';
import { getLastNumber } from '../../../services/getParams';
import { seachHandler } from '../../../services/search-utils';
import genre from './serial-genre.hbs';

/**
 * Класс, представляющий страницу члена съёмочной группы.
 */
export class SerialGenrePage {
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
            store.dispatch($sendSerialsCollectionAliasRequest());
            store.subscribe(SERIALS_COLLECTION_REDUCER, () => {
                store.getState().serials.serials.forEach(serial => {
                    if (serial && Number(id) === serial.id) {
                        const roundedMovies = serial.content.map(movie => {
                            // Используйте метод toFixed, чтобы округлить значение до 1 знака после запятой
                            const roundedRating = parseFloat(movie.rating.toFixed(1));
                            // Создайте новый объект с округленным значением rating

                            return { ...movie, rating: roundedRating };
                        });
                        this.#parent.innerHTML = '';

                        this.#parent.innerHTML = genre({
                            title: roundedMovies.name,
                            content: roundedMovies,
                        });
                        this.ratingFillColor();

                        avatarUpdate();
                    }
                });

            });
        } else {
            store.getState().serials.serials.forEach(serial => {
                if (serial && Number(id) === serial.id) {
                    const roundedMovies = serial.content.map(movie => {
                        // Используйте метод toFixed, чтобы округлить значение до 1 знака после запятой
                        const roundedRating = parseFloat(movie.rating.toFixed(1));
                        // Создайте новый объект с округленным значением rating

                        return { ...movie, rating: roundedRating };
                    });
                    this.#parent.innerHTML = '';

                    this.#parent.innerHTML = genre({
                        title: roundedMovies.name,
                        content: roundedMovies,
                    });
                    this.ratingFillColor();

                    avatarUpdate();

                }
            });
        }
        seachHandler();
    }
}
