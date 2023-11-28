import { logoutRequest } from '../../services/api/auth.js';
import { getContentById } from '../../services/api/content.js';
import { getLastNumber } from '../../services/getParams.js';
import { navigate } from '../../services/router/Router.js';
import content from './content.hbs';
import { setLike } from '../../services/api/like.js';
import { seachHandler } from '../../services/search-utils.js';
import { avatarUpdate } from '../../services/avatar-update.js';
export class ContentPage {
    #parent;
    constructor(parent = document.getElementById('root')) {
        this.#parent = parent;
    }

    async render() {
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        const id = getLastNumber(location.href);
        const film = await getContentById(id);

        this.#parent.innerHTML = content({ film: film.body });

        const video = document.querySelector('video');
        video.addEventListener('loadedmetadata', function () {
            const durationInSeconds = video.duration;

            // Преобразуем длительность из секунд в часы и минуты
            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);

            document.getElementById('duration').innerText = (`${hours} часов ${minutes} минут`);
        });

        document.getElementById('rating').innerText = parseFloat(film.body.film.rating.toFixed(1));

        document.getElementById('logout').addEventListener('click', async function () {
            const response = await logoutRequest();
            if (response.ok) {
                navigate('/login');
            }
        });

        avatarUpdate();

        document.querySelector('.heart-button').addEventListener('click', () => {
            setLike(id);
        });
        videoController();
        seachHandler();

        /* if (document.querySelector('iframe')) {
             document.querySelector('iframe').remove();
         }
         const frame = document.createElement('iframe');
         frame.width = '889';
         frame.height = '500';
         frame.src = 'http://localhost:81/nps';
         frame.frameBorder = '0';
         frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
         frame.allowFullscreen = true;
 
             document.body.appendChild(frame);
         }*/

    }
}

export const videoController = () => {
    const video = document.querySelector('.content-container__player');

    // Получаем текущее время воспроизведения из localStorage (если есть)
    const currentTime = localStorage.getItem(location.href);
    if (currentTime) {
        video.currentTime = parseFloat(currentTime);
    }

    // Сохраняем текущее время воспроизведения при его изменении
    video.addEventListener('timeupdate', () => {
        localStorage.setItem(location.href, video.currentTime);
    });
};

