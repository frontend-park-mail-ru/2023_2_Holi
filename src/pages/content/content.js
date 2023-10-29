import { logoutRequest } from '../../services/api/auth.js';
import { getContentById } from '../../services/api/content.js';
import { getLastNumber } from '../../services/getParams.js';
import { navigate } from '../../services/router/Router.js';

/*global Handlebars */
export class ContentPage {
    #parent;
    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        const template = Handlebars.templates['content.hbs'];
        const id = getLastNumber(location.href);
        getContentById(id);
        this.#parent.innerHTML = template();

        document.getElementById('logout').addEventListener('click', async function () {
            const response = await logoutRequest();
            if (response.ok) {
                navigate('/login');
            }
        });

        document.getElementById('dropdown').addEventListener('click', function () {
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
