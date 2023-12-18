import collectionTemplate from './feed-collection.hbs';
import { uuid } from '../../../services/uuid-time.js';
export class FeedCollection {
    #title;
    #content;
    #parent;
    #id;
    constructor(parent, title, content, id) {
        this.#content = content;
        this.#title = title;
        this.#parent = parent;
        this.#id = id;

        this.render();
    }

    /**
     * Обработчик события для перетаскивания содержимого карусели.
     * @param {string} carouselUUID - Идентификатор карусели.
     * @param {string} containerUUID - Идентификатор контейнера карусели.
     * TODO: доработать виртуальный скрол
     */
    scrolling = (carouselUUID, containerUUID) => {
        const carousel = document.getElementById(carouselUUID);
        const viewport = document.getElementById(containerUUID);
        let isScrolling = false;
        let startX, scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isScrolling = true;
            startX = e.pageX - viewport.offsetLeft;
            scrollLeft = viewport.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isScrolling = false;
        });

        carousel.addEventListener('mouseup', () => {
            isScrolling = false;
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.pageX - viewport.offsetLeft;
            const walk = (x - startX) * 1; // Увеличьте число, чтобы увеличить скорость перемещения
            viewport.scrollLeft = scrollLeft - walk;
        });
    };

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
            id: this.#id,
            title: this.#title,
            content: roundedMovies.sort((a, b) => b.rating - a.rating),
        });

        this.scrolling(carouselUUID, containerUUID);
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

    container.addEventListener('click', () => {
        if (!isDragging && !prevDrag) {
            // Остановка всех видео
            videoElements.forEach((otherContainer) => {
                const otherVideo = otherContainer.querySelector('video');
                if (otherVideo !== video && !otherVideo.paused) {
                    otherVideo.pause();
                    otherVideo.setAttribute('autoplay', 'false');
                    otherVideo.preload = 'none';
                }
            });

            video.preload = 'auto'; // Запустить загрузку видео
            video.setAttribute('autoplay', '');
            video.play();

        }
    });

    container.addEventListener('mousemove', () => {
        prevDrag = isDragging;
    });
});
    }
}
