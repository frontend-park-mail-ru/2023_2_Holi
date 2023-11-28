import collectionTemplate from './serials-feed-collections.hbs';
import { uuid } from '../../../services/uuid-time';
export class SerialsFeedCollection {
    #title;
    #content;
    #parent;

    constructor(parent, title, content) {
        this.#content = content;
        this.#title = title;
        this.#parent = parent;

        this.render();
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

    getTopRatedObjects(arr, count) {
        // Сортируем массив в порядке убывания рейтинга
        const sortedArr = arr.sort((a, b) => b.rating - a.rating);

        // Возвращаем указанное количество объектов с самыми высокими рейтингами
        return sortedArr.slice(0, count);
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

        const contentCount = window.innerWidth / 350;

        // Отобразите все элементы контента
        collection.innerHTML = collectionTemplate({
            carousel: carouselUUID,
            container: containerUUID,
            title: this.#title,
            content: this.getTopRatedObjects(roundedMovies, contentCount),
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
