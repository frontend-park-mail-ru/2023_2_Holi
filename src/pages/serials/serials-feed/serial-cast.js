import { getLastNumber } from '../../../services/getParams.js';
import cast from './serial-cast.hbs';
import { seachHandler } from '../../../services/search-utils.js';
import store from '../../../../index.js';
import { getSerialByCastId } from '../../../services/api/serials.js';
import { avatarUpdate } from '../../../services/avatar-update.js';

/**
 * Класс, представляющий страницу члена съёмочной группы.
 */
export class SerialCastPage {
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
        const id = getLastNumber(location.href);
        this.#parent.style.background = '';
        const filmsByCast = await getSerialByCastId(id);

        let content = filmsByCast.body.series;
        const castName = filmsByCast.body.cast.name;

        content = content.map(movie => {
            // Используйте метод toFixed, чтобы округлить значение до 1 знака после запятой
            const roundedRating = parseFloat(movie.rating.toFixed(1));
            // Создайте новый объект с округленным значением rating

            return { ...movie, rating: roundedRating };
        });

        this.#parent.innerHTML = '';
        this.#parent.innerHTML = cast({
            title: castName,
            content: content,
        });

        avatarUpdate();
        seachHandler();

        this.ratingFillColor();

    }
}
