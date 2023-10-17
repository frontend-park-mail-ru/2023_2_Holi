import { FeedContentMain } from './components/content/feed-content-main.js';
import { GenreRow } from './components/content/genre/genre.js';
import { FeedHeader } from './components/header/header.js';
import { uuid } from '../../services/uuid-time.js';
import { FeedFooter } from './components/footer/footer.js';
import { logoutRequest } from '../../services/api/auth.js';
import { goToLink } from '../../services/goToLink.js';
import { getGenreFilms } from '../../services/api/genre.js';

/**
 * Класс, представляющий страницу ленты.
 */
export class FeedPage {
    #parent;

    /**
    * Создает новый экземпляр класса FeedPage.
    * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница.
    */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Добавляет строку жанра в ленту.
     * @param {string} title - Заголовок жанра.
     * @param {string} content - Содержимое жанра.
     */
    addRow(title, content) {
        const genre = document.createElement('div');
        const idCarousel = uuid();
        const idContainer = uuid();
        genre.innerHTML = new GenreRow(title, content, idCarousel, idContainer).render();
        this.#parent.appendChild(genre);
        dragging(idCarousel, idContainer);
    }

    /**
     * Рендерит страницу ленты.
     */
    async render() {
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        const header = document.createElement('div');
        header.innerHTML = new FeedHeader().render();
        this.#parent.appendChild(header);

        const mainContent = document.createElement('div');
        mainContent.innerHTML = new FeedContentMain('').render();
        this.#parent.appendChild(mainContent);

        /*const Drama = await getGenreFilms('Drama');
        const Fantasy = await getGenreFilms('Fantasy');
        const Horror = await getGenreFilms('Horror');
        const Action = await getGenreFilms('Action');
        const Thriller = await getGenreFilms('Thriller');
        const Comedy = await getGenreFilms('Comedy');
        const Romance = await getGenreFilms('Romance');
        const Crime = await getGenreFilms('Crime');

        if (Drama.status === 200) {
            this.addRow('Драмы', Drama.body.films);
        }

        if (Fantasy.status === 200) {
            this.addRow('Фэнтези', Fantasy.body.films);
        }

        if (Horror.status === 200) {
            this.addRow('Ужасы', Horror.body.films);
        }

        if (Action.status === 200) {
            this.addRow('Экшены', Action.body.films);
        }

        if (Thriller.status === 200) {
            this.addRow('Триллеры', Thriller.body.films);
        }

        if (Comedy.status === 200) {
            this.addRow('Комедии', Comedy.body.films);
        }

        if (Romance.status === 200) {
            this.addRow('Мелодрамы', Romance.body.films);
        }

        if (Crime.status === 200) {
            this.addRow('Детективы', Crime.body.films);
        }*/

        const footer = document.createElement('div');
        footer.innerHTML = new FeedFooter().render();
        this.#parent.appendChild(footer);

        goToFilms();

        document.getElementById('logout').addEventListener('click', async function () {
            console.info(132323);
            const response = await logoutRequest();
            if (response.ok) {
                goToLink('login');
            }
        });

        document.getElementById('profile').addEventListener('click', function () {
            console.info(132323);
            goToLink('profile');
        });


        document.getElementById('dropdown').addEventListener('click', function () {
            /*  Toggle the CSS closed class which reduces the height of the UL thus 
                hiding all LI apart from the first */
            this.parentNode.parentNode.classList.toggle('closed')
        }, false);
    }
}

/**
 * Обработчик события для перехода к фильмам определенного жанра.
 */
const goToFilms = () => {
    const genreCardLinks = document.querySelectorAll('.genre-card-link');
    genreCardLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('data-id');
            history.pushState(null, null, id);
        });
    });
};

/**
 * Обработчик события для перетаскивания содержимого карусели.
 * @param {string} idCarousel - Идентификатор карусели.
 * @param {string} container - Идентификатор контейнера карусели.
 */
const dragging = (idCarousel, container) => {
    const carousel = document.getElementById(idCarousel);
    const wrapper = document.getElementById(container);
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
