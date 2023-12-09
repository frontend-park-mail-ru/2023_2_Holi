import { logoutRequest } from '../../../services/api/auth.js';
import { getLastNumber } from '../../../services/getParams.js';
import { navigate } from '../../../services/router/Router.js';
import serial from './serials-content.hbs';
import { deleteLike, getLikeState, setLike } from '../../../services/api/like.js';
import { seachHandler } from '../../../services/search-utils.js';
import store from '../../../../index.js';
import { $sendSerialsContentRequest, SERIALS_CONTENT_REDUCER } from '../../../services/flux/actions/serial-content.js';
import { avatarUpdate } from '../../../services/avatar-update.js';

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

export class SerialContentPage {
    #parent;
    constructor(parent) {
        this.#parent = parent;
    }

    setEpisodeData(id, episode, serials) {
        document.getElementById('episodeName').innerText = `${episode.season} сезон, ${episode.number} серия, ${episode.name}`;
        document.querySelector('source').src = episode.mediaPath;
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

    async render() {
        store.clearSubscribes();
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        const id = getLastNumber(location.href);

        store.dispatch($sendSerialsContentRequest(id));

        store.subscribe(SERIALS_CONTENT_REDUCER, () => {
            const state = store.getState().currentSerial.serials;
            this.#parent.innerHTML = serial({ film: state.film, artists: state.artists });
            const episode = state.episodes[Number(localStorage.getItem('lastSerial_' + id))];

            // Вызываем функцию группировки
            const groupedEpisodesArray = groupBySeason(state.episodes);

            // Выводим результат в консоль
            console.info(groupedEpisodesArray);

            const seasonSelect = document.getElementById('season');
            const episodeSelect = document.getElementById('episode');

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
                console.info(targetEpisode);
                this.setEpisodeData(id,
                    targetEpisode,
                    state.episodes);
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

            document.getElementById('logout').addEventListener('click', async function () {
                const response = await logoutRequest();
                if (response.ok) {
                    navigate('/login');
                }
            });

            videoController();

            avatarUpdate();

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

