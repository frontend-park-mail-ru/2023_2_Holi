import { logoutRequest } from '../../services/api/auth.js';
import { getContentById } from '../../services/api/content.js';
import { getLastNumber } from '../../services/getParams.js';
import { navigate } from '../../services/router/Router.js';
import { rootElement } from '../../../index.js';
/*global Handlebars */
class ContentPage {
    #parent;
    constructor(parent) {
        this.#parent = parent;
    }

    async render() {
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        const template = Handlebars.templates['content.hbs'];
        const id = getLastNumber(location.href);
        const film = await getContentById(id);

        console.info({ content: film.body });
        this.#parent.innerHTML = template({ film: film.body });

        const video = document.querySelector('video');
        video.addEventListener('loadedmetadata', function() {
            const durationInSeconds = video.duration;

            // Преобразуем длительность из секунд в часы и минуты
            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);

            document.getElementById('duration').innerText = (`${hours} часов ${minutes} минут`);
        });

        document.getElementById('rating').innerText = parseFloat(film.body.film.rating.toFixed(1));

        document.getElementById('logout').addEventListener('click', async function() {
            const response = await logoutRequest();
            if (response.ok) {
                navigate('/login');
            }
        });

        document.getElementById('dropdown').addEventListener('click', function() {
            this.parentNode.parentNode.classList.toggle('closed');
        }, false);

        videoController();
    }
}

export const videoController = () => {
    const video = document.querySelector('.content-container__player');

    // Получаем текущее время воспроизведения из localStorage (если есть)
    const currentTime = localStorage.getItem(location.href);
    if (currentTime) {
        video.currentTime = parseFloat(currentTime);
    }
    video.addEventListener('play', () => {
        video.requestFullscreen();
    });

    // Сохраняем текущее время воспроизведения при его изменении
    video.addEventListener('timeupdate', () => {
        localStorage.setItem(location.href, video.currentTime);
    });
};

export default new ContentPage(rootElement);
