/*global Handlebars */

import {VideoItem} from './components/video-item.js';
import {getLastNumber} from '../../services/getParams.js';
import {getContentByCastId} from '../../services/api/content.js';
import { rootElement } from '../../../index.js';

/**
 * Класс, представляющий страницу члена съёмочной группы.
 */
class CastPage {
    #parent;

    /**
     * Создает новый экземпляр класса CastPage.
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлена страница.
     */
    constructor(parent) {
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

        const filmsByCast = await getContentByCastId(id);
        let content = [];
        let castName;
        // if (filmsByCast.status === 200) {
        content = filmsByCast.body.films;
        castName = filmsByCast.body.cast.name;
        // }

        this.#parent.innerHTML = '';
        document.body.style.background = '#181818';
        const template = Handlebars.templates['cast.hbs'];
        this.#parent.innerHTML = template({
            name: castName,
        });

        this.addVideoCard(content);

    }
}

export default new CastPage(rootElement);
