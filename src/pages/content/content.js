import { logoutRequest } from '../../services/api/auth.js';
import { getContentById } from '../../services/api/content.js';
import { getLastNumber } from '../../services/getParams.js';
import { navigate } from '../../services/router/Router.js';
import { rootElement } from '../../../index.js';
import { getAdjacentElements } from '../../services/arrayUtils.js';
import content from './content.hbs';
import { getUserInfo } from '../../services/api/user.js';
class ContentPage {
    #parent;
    constructor(parent = document.getElementById('root')) {
        this.#parent = parent;
    }

    async render() {
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        const id = getLastNumber(location.href);
        const film = await getContentById(id);

        console.info({ content: film.body });
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

        const userInfo = await getUserInfo(localStorage.getItem('userId'));

        if (userInfo.body.user.imagePath.length > 0) {
            setTimeout(() => {
                document.querySelector('.avatar').src = userInfo.body.user.imagePath;
            }, 0);
        } else {
            setTimeout(() => {
                document.querySelector('.avatar').src = 'https://static_holi.hb.ru-msk.vkcs.cloud/Preview_Film/HOW_TO_BUILD_A_GIRL.jpg';
            }, 0);
        }
        document.getElementById('dropdown').addEventListener('click', function () {
            this.parentNode.parentNode.classList.toggle('closed');
        }, false);
        const collectonContent = JSON.parse(localStorage.getItem('lastCollection'));

        const idsArray = collectonContent.map(item => item.id);

        const prevLink = document.getElementById('prev-button');
        const nextLink = document.getElementById('next-button');
        const { previous, next } = getAdjacentElements(idsArray, Number(id));
        console.info(getAdjacentElements(idsArray, Number(id)));
        prevLink.href = previous ? `/movies/${previous}` : `/movies/${id}`;
        nextLink.href = next ? `/movies/${next}` : `/movies/${id}`;

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

    // Сохраняем текущее время воспроизведения при его изменении
    video.addEventListener('timeupdate', () => {
        localStorage.setItem(location.href, video.currentTime);
    });
};

export default new ContentPage(rootElement);
