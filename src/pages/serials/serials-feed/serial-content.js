import { getLastNumber } from '../../../services/getParams.js';
import serial from './serials-content.hbs';
import { deleteLike, getLikeState, setLike } from '../../../services/api/like.js';
import { seachHandler } from '../../../services/search-utils.js';
import store from '../../../../index.js';
import { $sendSerialsContentRequest, SERIALS_CONTENT_REDUCER } from '../../../services/flux/actions/serial-content.js';
import { avatarUpdate } from '../../../services/avatar-update.js';
import { SerialsSeason } from './serial-season.js';
import { logoutHandle } from '../../../services/logoutHandle.js';
import { setRating } from '../../../services/set-rating.js';
import { checkPaymentLink } from '../../../services/api/payment.js';
import { closeOnBackDropClick } from '../../../components/modal/modal.js';

// Функция для группировки массива по полю "season" в двумерный массив
function groupBySeason(episodes) {
    return episodes.reduce((acc, episode) => {
        const season = episode.season;
        if (!acc[season - 1]) {
            acc[season - 1] = [];
        }
        acc[season - 1].push(episode);

        return acc;
    }, []);
}
/**
 * Класс для отображения страницы контента сериала.
 */
export class SerialContentPage {
    #parent;
    /**
     * Создает экземпляр класса SerialContentPage.
     *
     * @param {HTMLElement} parent - Родительский элемент, в который будет вставлен контент страницы.
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Устанавливает данные эпизода и обновляет интерфейс.
     *
     * @param {number} id - Идентификатор сериала.
     * @param {object} episode - Объект с данными эпизода.
     * @param {Array} serials - Массив серий сериала.
     */
    setEpisodeData(id, episode, serials) {
        document.getElementById('episodeName').innerText = `${episode.season} сезон, ${episode.number} серия, ${episode.name}`;
        document.querySelector('source').src = `${episode.mediaPath}#t=3`;
        document.getElementById('serialDescription').innerText = episode.description;

        const video = document.querySelector('video');
        video.load();
        video.addEventListener('loadedmetadata', function () {
            const durationInSeconds = video.duration;

            // Преобразуем длительность из секунд в часы и минуты
            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);

            if (hours > 0 && minutes > 0) {
                document.getElementById('duration').innerText = (`${hours} ч ${minutes} м`);
            } else if (minutes === 0) {
                document.getElementById('duration').innerText = (`${hours} ч`);
            } else if (hours === 0) {
                document.getElementById('duration').innerText = (` ${minutes} м`);
            }
        });

        localStorage.setItem('lastSerial_' + id, episode.id);

        const prevButton = document.getElementById('prev-button');
        const prevLabel = document.getElementById('prevEpisode');
        const nextButton = document.getElementById('next-button');
        const nextLabel = document.getElementById('nextEpisode');
        const idx = serials.findIndex(elem => elem.id === episode.id);
        if (idx === 0) {
            prevButton.classList.add('btn-action__disabled');
            prevLabel.innerText = '';
            nextLabel.innerText = `${serials[idx + 1].season} сезон, ${serials[idx + 1].number} серия, ${serials[idx + 1].name}`;
        } else if (idx === length - 1) {
            nextButton.classList.add('btn-action__disabled');
            prevLabel.innerText = `${serials[idx - 1].season} сезон, ${serials[idx - 1].number} серия, ${serials[idx - 1].name}`;
            nextLabel.innerText = '';
        } else {
            prevButton.classList.remove('btn-action__disabled');
            nextButton.classList.remove('btn-action__disabled');
            prevLabel.innerText = `${serials[idx - 1].season} сезон, ${serials[idx - 1].number} серия, ${serials[idx - 1].name}`;
            nextLabel.innerText = `${serials[idx + 1].season} сезон, ${serials[idx + 1].number} серия, ${serials[idx + 1].name}`;
        }

    }

    /**
     * Обработчик выбора сезона и обновления списка эпизодов.
     *
     * @param {HTMLElement} seasonSelect - Выпадающий список сезонов.
     * @param {HTMLElement} episodeSelect - Выпадающий список эпизодов.
     * @param {Array} groupedEpisodesArray - Массив, сгруппированный по сезонам.
     */
    selectHandler(seasonSelect, episodeSelect, groupedEpisodesArray) {
        const currentSeason = seasonSelect.value;
        episodeSelect.innerHTML = '';
        groupedEpisodesArray[currentSeason - 1].forEach((episode, i) => {
            const opt = document.createElement('option');
            opt.value = episode.id;
            opt.textContent = `${i + 1} серия ${episode.name}`;
            episodeSelect.appendChild(opt);
        });
    }

    /**
     * Рендерит страницу контента сериала.
     */
    async render() {
        store.clearSubscribes();
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        const id = getLastNumber(location.href);

        localStorage.setItem('LastContentId', id);
        store.dispatch($sendSerialsContentRequest(id));

        store.subscribe(SERIALS_CONTENT_REDUCER, () => {
            const state = store.getState().currentSerial.serials;
            this.#parent.innerHTML = serial({ film: state.film, artists: state.artists });
            document.getElementById('dialog').addEventListener('click', closeOnBackDropClick);
            checkPaymentLink()
                .then(linkResponse => {
                    if (!linkResponse.body.status) {
                        const dialog = document.querySelector('#subs');
                        const dialogClose = document.getElementById('subs_btn_close');
                        dialog.showModal();

                        dialog.addEventListener('click', closeOnBackDropClick);

                        dialogClose.addEventListener('click', () => {
                            dialog.close();
                        });
                    }
                });

            let episode;
            if (localStorage.getItem('lastSerial_' + id)) {
                const idx = state.episodes.findIndex(elem => elem.id === Number(localStorage.getItem('lastSerial_' + id)));
                episode = state.episodes[idx];
            } else {
                episode = state.episodes[0];
            }

            // Вызываем функцию группировки
            const groupedEpisodesArray = groupBySeason(state.episodes);

            const seasonSelect = document.getElementById('season');
            const episodeSelect = document.getElementById('episode');
            const seasons = document.getElementById('seasons-carousel');

            groupedEpisodesArray.forEach((season, i) => {
                new SerialsSeason(seasons, `${i + 1} Сезон`, groupedEpisodesArray[i]);
            });
            const totalSeason = groupedEpisodesArray.length;

            for (let i = 0; i < totalSeason; i++) {
                const opt = document.createElement('option');
                opt.value = i + 1;
                opt.textContent = `${i + 1} сезон`;
                seasonSelect.appendChild(opt);
            }

            this.selectHandler(seasonSelect, episodeSelect, groupedEpisodesArray);
            seasonSelect.addEventListener('change', () => {
                this.selectHandler(seasonSelect, episodeSelect, groupedEpisodesArray);
            });

            episodeSelect.addEventListener('change', (e) => {
                const targetEpisode = state.episodes.find((ep) => ep.id == e.target.value);
                this.setEpisodeData(id,
                    targetEpisode,
                    state.episodes);
            });
            // Определяем функцию для плавного прокручивания вверх
            function scrollToTop() {
                // Получаем текущую позицию прокрутки
                const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;

                // Если текущая позиция не равна 0, то прокручиваем страницу вверх
                if (currentPosition > 0) {
                    window.requestAnimationFrame(scrollToTop);
                    window.scrollTo(0, currentPosition - currentPosition / 20);
                }
            }

            const elementsWithEpisodeAttribute = document.querySelectorAll('[episode]');
            elementsWithEpisodeAttribute.forEach(episode => {
                episode.addEventListener('click', (event) => {
                    event.preventDefault();
                    const targetEpisode = state.episodes.find((ep) => ep.id == event.target.id);
                    this.setEpisodeData(id,
                        targetEpisode,
                        state.episodes);
                    // Вызываем функцию для плавного прокручивания вверх
                    scrollToTop();
                });
            });

            this.setEpisodeData(id,
                episode,
                state.episodes);
            document.getElementById('rating').innerText = parseFloat(state.film.rating.toFixed(1));
            seachHandler();

            const prevButton = document.getElementById('prev-button');
            prevButton.removeAttribute('spa-link');
            const nextButton = document.getElementById('next-button');
            nextButton.removeAttribute('spa-link');

            prevButton.addEventListener('click', (e) => {
                const currentEpisodeId = Number(localStorage.getItem('lastSerial_' + id));
                const idx = state.episodes.findIndex(elem => elem.id === currentEpisodeId);
                e.preventDefault();
                this.setEpisodeData(id,
                    state.episodes[idx - 1],
                    state.episodes);
            });

            nextButton.addEventListener('click', (e) => {
                const currentEpisodeId = Number(localStorage.getItem('lastSerial_' + id));
                const idx = state.episodes.findIndex(elem => elem.id === currentEpisodeId);
                e.preventDefault();
                this.setEpisodeData(id,
                    state.episodes[idx + 1],
                    state.episodes);
            });

            const like = document.querySelector('.heart-button');

            getLikeState(id).then(response => {
                if (response.body.isFavourite === true) {
                    like.querySelector('i').className = 'like';
                } else {
                    like.querySelector('i').className = 'empty-like';
                }
            });

            like.addEventListener('click', () => {
                if (like.querySelector('i').className === 'like') {
                    deleteLike(id).then(() => {
                        setTimeout(() => {
                            like.querySelector('i').className = 'empty-like';
                        }, 0);

                    });
                } else if (like.querySelector('i').className === 'empty-like') {
                    setLike(id).then(() => {
                        setTimeout(() => {
                            like.querySelector('i').className = 'like';
                        }, 0);
                    });
                }
            });

            logoutHandle();

            videoController();

            avatarUpdate();
            setRating();
        });
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

