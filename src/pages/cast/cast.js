import { VideoItem } from './components/video-item.js';
import { getLastNumber } from '../../services/getParams.js';
import { getContentByCastId } from '../../services/api/content.js';
import cast from './cast.hbs';
import { rootElement } from '../../../index.js';
import { getUserInfo } from '../../services/api/user.js';

/**
 * Класс, представляющий страницу члена съёмочной группы.
 */
class CastPage {
    #parent;

    /**
     * Создает новый экземпляр класса CastPage.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница.
     */
    constructor(parent = document.getElementById('root')) {
        this.#parent = parent;
    }

    addVideoCard(content) {
        const root = document.getElementById('cast-page');
        root.innerHTML = '';
        content.forEach((data) => {
            new VideoItem(root, data);
        });

    }

    /**
     * Рендерит страницу.
     */
    async render() {
        const id = getLastNumber(location.href);
        this.#parent.style.background = '';
        const filmsByCast = await getContentByCastId(id);
        let content = [];
        let castName;
        // if (filmsByCast.status === 200) {
        content = filmsByCast.body.films;
        castName = filmsByCast.body.cast.name;
        // }
        content = content.map(movie => {
            // Используйте метод toFixed, чтобы округлить значение до 1 знака после запятой
            const roundedRating = parseFloat(movie.rating.toFixed(1));
            // Создайте новый объект с округленным значением rating

            return { ...movie, rating: roundedRating };
        });

        const userInfo = await getUserInfo(localStorage.getItem('userId'));

        if (userInfo.body.user.imagePath.length) {
            setTimeout(() => {
                document.querySelector('.avatar').src = userInfo.body.user.imagePath;
            }, 0);
        } else {
            setTimeout(() => {
                document.querySelector('.avatar').src = 'https://static_holi.hb.ru-msk.vkcs.cloud/Preview_Film/HOW_TO_BUILD_A_GIRL.jpg';
            }, 0);
        }
        this.#parent.innerHTML = '';
        this.#parent.innerHTML = cast({
            name: castName,
        });

        this.addVideoCard(content);

        document.getElementById('dropdown').addEventListener('click', function () {
            this.parentNode.parentNode.classList.toggle('closed');
        }, false);

    }
}

export default new CastPage(rootElement);
