import store from '../../..';
import { deleteLike } from '../../services/api/like';
import { $sendGetFavourites } from '../../services/flux/actions/like';
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
        this.#parent.innerHTML = '';

        store.dispatch($sendGetFavourites());
        store.subscribe('FAVOURITES_REDUCER', () => {
            console.info(store.getState());

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

                    return { ...movie, rating: roundedRating };
                });
                console.info(startContent);

                this.#parent.innerHTML = like({
                    notEmpty: true,
                    title: 'Избранное',
                    content: roundedMovies,
                });
                this.ratingFillColor();

                document.querySelectorAll('.heart-button').forEach(button => {
                    button.addEventListener('click', (event) => {
                        deleteLike(button.id)
                            .then(res => {
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

            seachHandler();
        });

    }
}
