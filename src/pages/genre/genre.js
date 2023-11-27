import store from '../../..';
import { $sendCollectionAliasRequest } from '../../services/flux/actions/collections';
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
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/');

        // Получаем последнюю часть адреса
        const lastPart = pathParts[pathParts.length - 1];
        const state = store.getState();
        if (!state) {
            store.dispatch($sendCollectionAliasRequest());
            store.subscribe(() => {
                const startContent = store.getState().collections.collections.find(obj => obj.name === lastPart);

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
            });
        } else {
            const startContent = state.collections.collections.find(obj => obj.name === lastPart);

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
        }
        seachHandler();

    }
}
