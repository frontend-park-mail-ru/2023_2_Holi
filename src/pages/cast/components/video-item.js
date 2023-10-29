/* global Handlebars */
export class VideoItem {
    #title;
    #content;
    #parent;

    constructor(parent, content) {
        this.#content = content;
        this.#parent = parent;

        this.render();
    }

    ratingFillColor() {
        // Получите все элементы с рейтингом
        const ratingElements = document.querySelectorAll('.video-item__advanced-info__rating');

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
        const template = Handlebars.templates['video-item.hbs'];

        const videoItem = document.createElement('div');
        // videoItem.id = collectionUUID;

        this.#parent.appendChild(videoItem);

        // Отобразите все элементы контента
        videoItem.innerHTML = template({
            content: this.#content,
        });

        this.ratingFillColor();
    }
}