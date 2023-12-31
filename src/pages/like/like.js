import store from '../../..';
import { deleteLike } from '../../services/api/like';
import { avatarUpdate } from '../../services/avatar-update';
import { $sendGetFavourites } from '../../services/flux/actions/like';
import { logoutHandle } from '../../services/logoutHandle';
import { seachHandler } from '../../services/search-utils';
import like from './like.hbs';

/**
 * Класс, представляющий страницу члена съёмочной группы.
 */
export class FavouritesPage {
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
        store.clearSubscribes();
        this.#parent.innerHTML = '';

        store.dispatch($sendGetFavourites());
        store.subscribe('FAVOURITES_REDUCER', () => {

            const startContent = store.getState().favourites.favourites.videos;
            if (!startContent) {
                this.#parent.innerHTML = like({
                    empty: true,
                });
            } else {
                const roundedMovies = startContent.map(movie => {
                    // Используйте метод toFixed, чтобы округлить значение до 1 знака после запятой
                    const roundedRating = parseFloat(movie.rating.toFixed(1));
                    // Создайте новый объект с округленным значением rating
                    if (movie.seasonsCount > 0) {
                        return { ...movie, rating: roundedRating, url: `/serial/${movie.id}` };
                    } else if (movie.seasonsCount === 0) {
                        return { ...movie, rating: roundedRating, url: `/movies/${movie.id}` };
                    }
                });

                this.#parent.innerHTML = like({
                    notEmpty: true,
                    title: 'Избранное',
                    content: roundedMovies,
                });
                this.ratingFillColor();

                document.querySelectorAll('.heart-button-dislike').forEach(button => {
                    button.addEventListener('click', () => {
                        deleteLike(button.id)
                            .then(() => {
                                // Находим родительский элемент с классом feed-collection__container-card
                                const containerCard = button.closest('.feed-collection__container-card');

                                // Если родительский элемент найден, скрываем его
                                if (containerCard) {
                                    containerCard.style.display = 'none';
                                }
                            });
                    });
                });
            }

            logoutHandle();
            seachHandler();
            avatarUpdate();
        });

    }
}
