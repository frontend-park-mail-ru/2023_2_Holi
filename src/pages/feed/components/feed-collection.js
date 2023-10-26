/* global Handlebars */
import { uuid } from '../../../services/uuid-time.js';
export class FeedCollection {
    #title;
    #content;
    #parent;

    constructor(parent, title, content) {
        this.#content = content;
        this.#title = title;
        this.#parent = parent;

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

            if (rating >= 4) {
                element.classList.add('rating-high');
            } else if (rating >= 2) {
                element.classList.add('rating-medium');
            } else {
                element.classList.add('rating-low');
            }
        });
    }

    render() {
        const template = Handlebars.templates['feed-collection.hbs'];
        const carouselUUID = uuid();
        const containerUUID = uuid();
        const collectionUUID = uuid();

        const collection = document.createElement('div');
        collection.id = collectionUUID;

        this.#parent.appendChild(collection);

        // Отобразите все элементы контента
        collection.innerHTML = template({
            carousel: carouselUUID,
            container: containerUUID,
            title: this.#title,
            content: this.#content,
        });

        this.scrolling(carouselUUID, containerUUID);
        this.ratingFillColor();
    }
}
