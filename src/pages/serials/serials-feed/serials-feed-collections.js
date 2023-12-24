import collectionTemplate from './serials-feed-collections.hbs';
import { uuid } from '../../../services/uuid-time';

/**
 * Класс для отображения коллекции сериалов.
 */
export class SerialsFeedCollection {
    #title;
    #content;
    #parent;
    #id;

    /**
     * Создает экземпляр класса SerialsFeedCollection.
     *
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена коллекция сериалов.
     * @param {string} title - Заголовок коллекции.
     * @param {Array} content - Массив объектов сериалов.
     * @param {number} id - Идентификатор коллекции.
     */
    constructor(parent, title, content, id) {
        this.#content = content;
        this.#title = title;
        this.#parent = parent;
        this.#id = id;

        this.render();
    }
    /**
        * Заполняет цветом рейтинговых элементов в коллекции.
        */
    ratingFillColor() {
        // Получите все элементы с рейтингом
        const ratingElements = document.querySelectorAll('.feed-collection__advanced-info__rating');
        // Переберите элементы и добавьте классы в зависимости от значения рейтинга
        ratingElements.forEach(element => {
            const rating = parseInt(element.getAttribute('data-rating'), 10);

            if (rating >= 8) {
                element.classList.add('rating-high');
            } else if (rating >= 5) {
                element.classList.add('rating-medium');
            } else {
                element.classList.add('rating-low');
            }
        });
    }
    /**
         * Возвращает массив объектов, отсортированный по убыванию рейтинга.
         *
         * @param {Array} arr - Массив объектов сериалов.
         * @returns {Array} - Отсортированный массив объектов.
         */
    getTopRatedObjects(arr) {
        return arr.sort((a, b) => b.rating - a.rating);
    }
    /**
        * Рендерит коллекцию сериалов.
        */
    render() {
        const carouselUUID = uuid();
        const containerUUID = uuid();
        const collectionUUID = uuid();

        const collection = document.createElement('div');
        collection.id = collectionUUID;
        collection.className = 'collection';

        this.#parent.appendChild(collection);
        const roundedMovies = this.#content.map(movie => {
            // Используйте метод toFixed, чтобы округлить значение до 1 знака после запятой
            const roundedRating = parseFloat(movie.rating.toFixed(1));
            // Создайте новый объект с округленным значением rating

            return { ...movie, rating: roundedRating };
        });

        // Отобразите все элементы контента
        collection.innerHTML = collectionTemplate({
            carousel: carouselUUID,
            container: containerUUID,
            title: this.#title,
            id: this.#id,
            content: this.getTopRatedObjects(roundedMovies),
        });

        this.ratingFillColor();

        // Получите все элементы <video> на странице
        const videoElements = document.querySelectorAll('.feed-collection__container-card');

        let isDragging = false;
        let prevDrag = false;

        collection.addEventListener('click', () => {
            localStorage.setItem('lastCollection', JSON.stringify(this.#content));
        });

        videoElements.forEach((container) => {
            const video = container.querySelector('video');

            container.addEventListener('mousedown', () => {
                isDragging = true;
            });

            container.addEventListener('mouseup', () => {
                isDragging = false;
            });

            container.addEventListener('click', (event) => {
                if (isDragging && prevDrag) {
                    event.preventDefault();
                    // Остановка всех видео
                    /* videoElements.forEach((otherContainer) => {
                         const otherVideo = otherContainer.querySelector('video');
                         if (otherVideo !== video && !otherVideo.paused) {
                             otherVideo.pause();
                             otherVideo.setAttribute('autoplay', 'false');
                             otherVideo.preload = 'none';
                         }
                     });
                     video.preload = 'auto'; // Запустить загрузку видео
                     video.setAttribute('autoplay', '');
                     video.play();*/

                }
            });

            container.addEventListener('mousemove', () => {
                prevDrag = isDragging;
            });
        });
    }
}
