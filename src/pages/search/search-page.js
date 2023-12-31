import searchPage from './search-page.hbs';
import { seachHandler } from '../../services/search-utils.js';
import store from '../../../index.js';
import { avatarUpdate } from '../../services/avatar-update.js';
import { searchRequest } from '../../services/api/search.js';
import { logoutHandle } from '../../services/logoutHandle.js';

/**
 * Класс, представляющий страницу члена съёмочной группы.
 */
export class SearchPage {
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
        this.#parent.style.background = '';

        const lastWord = localStorage.getItem('lastSearchInput');
        const content = await searchRequest(lastWord);

        const films = content.body.films;
        const cast = content.body.cast;

        let hasCast = false;
        if (cast && cast.length) {
            hasCast = true;
        }

        const rFilms = films.map(movie => {
            // Используйте метод toFixed, чтобы округлить значение до 1 знака после запятой
            const roundedRating = parseFloat(movie.rating.toFixed(1));
            // Создайте новый объект с округленным значением rating

            return { ...movie, rating: roundedRating };
        });

        let hasMovies = false;
        const movies = rFilms.filter((film) => film.seasonsCount === 0);
        if (movies && movies.length) {
            hasMovies = true;
        }

        let hasSeries = false;
        const series = rFilms.filter((film) => film.seasonsCount > 0);
        if (series && series.length) {
            hasSeries = true;
        }
        this.#parent.innerHTML = '';
        this.#parent.innerHTML = searchPage({
            title: lastWord,
            cast: cast,
            films: movies,
            serial: series,
            hasCast: hasCast,
            hasMovies: hasMovies,
            hasSeries: hasSeries,
        });

        avatarUpdate();
        seachHandler();
        logoutHandle();
        this.ratingFillColor();

    }
}
