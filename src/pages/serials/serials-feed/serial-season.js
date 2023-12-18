import season from './serial-season.hbs';
import { uuid } from '../../../services/uuid-time';
export class SerialsSeason {
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

    render() {
        const carouselUUID = uuid();
        const containerUUID = uuid();
        const collectionUUID = uuid();

        const collection = document.createElement('div');
        collection.id = collectionUUID;
        collection.className = 'collection';

        this.#parent.appendChild(collection);

        // Отобразите все элементы контента
        collection.innerHTML = season({
            carousel: carouselUUID,
            container: containerUUID,
            title: this.#title,
            id: this.#id,
            content: this.#content,
        });

        this.scrolling(carouselUUID, containerUUID);

    }
}
