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
        const wrapper = document.getElementById(containerUUID);
        let isDragging = false;
        let startX, scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - wrapper.offsetLeft;
            scrollLeft = wrapper.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        carousel.addEventListener('mouseup', () => {
            isDragging = false;
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - wrapper.offsetLeft;
            const walk = (x - startX) * 1; // Увеличьте число, чтобы увеличить скорость перемещения
            wrapper.scrollLeft = scrollLeft - walk;
        });
    };

    render() {
        const template = Handlebars.templates['feed-collection.hbs'];
        const carouselUUID = uuid();
        const containerUUID = uuid();
        this.#parent.insertAdjacentHTML('beforeend', template({
            carousel: carouselUUID,
            container: containerUUID,
            title: this.#title,
            content: this.#content,
        }));
        this.scrolling(carouselUUID, containerUUID);
    }
}
