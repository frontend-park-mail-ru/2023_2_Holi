import { logoutRequest } from '../../../services/api/auth.js';
import { getLastNumber } from '../../../services/getParams.js';
import { navigate } from '../../../services/router/Router.js';
import serial from './serials-content.hbs';
import { deleteLike, getLikeState, setLike } from '../../../services/api/like.js';
import { seachHandler } from '../../../services/search-utils.js';
import store from '../../../../index.js';
import { $sendSerialsContentRequest, SERIALS_CONTENT_REDUCER } from '../../../services/flux/actions/serial-content.js';
import { avatarUpdate } from '../../../services/avatar-update.js';

export class SerialContentPage {
    #parent;
    constructor(parent) {
        this.#parent = parent;
    }

    setEpisodeData(id, season, serialNumber, serialName, serialUrl, serialDescription, i, length, array) {
        document.getElementById('episodeName').innerText = `${season} сезон, ${serialNumber} серия, ${serialName}`;
        document.querySelector('source').src = serialUrl;
        document.getElementById('serialDescription').innerText = serialDescription;

        const video = document.querySelector('video');
        video.load();
        video.setAttribute('data-count', i);
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

        localStorage.setItem('lastSerial_' + id, i);

        const prevButton = document.getElementById('prev-button');
        const prevLabel = document.getElementById('prevEpisode');
        const nextButton = document.getElementById('next-button');
        const nextLabel = document.getElementById('nextEpisode');

        if (i === 0) {
            prevButton.classList.add('btn-action__disabled');
            prevLabel.innerText = '';
            nextLabel.innerText = `${array[i + 1].season} сезон, ${array[i + 1].number} серия, ${array[i + 1].name}`;
        } else if (i === length - 1) {
            nextButton.classList.add('btn-action__disabled');
            prevLabel.innerText = `${array[i - 1].season} сезон, ${array[i - 1].number} серия, ${array[i - 1].name}`;
            nextLabel.innerText = '';
        } else {
            prevButton.classList.remove('btn-action__disabled');
            nextButton.classList.remove('btn-action__disabled');
            prevLabel.innerText = `${array[i - 1].season} сезон, ${array[i - 1].number} серия, ${array[i - 1].name}`;
            nextLabel.innerText = `${array[i + 1].season} сезон, ${array[i + 1].number} серия, ${array[i + 1].name}`;
        }

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
            this.setEpisodeData(id, episode.season, episode.number, episode.name, episode.mediaPath, episode.description, Number(localStorage.getItem('lastSerial_' + id)), state.episodes.length, state.episodes);
            document.getElementById('rating').innerText = parseFloat(state.film.rating.toFixed(1));
            seachHandler();

            const prevButton = document.getElementById('prev-button');
            prevButton.removeAttribute('spa-link');
            const nextButton = document.getElementById('next-button');
            nextButton.removeAttribute('spa-link');

            prevButton.addEventListener('click', (e) => {
                const currentEpisode = Number(localStorage.getItem('lastSerial_' + id));
                e.preventDefault();
                this.setEpisodeData(id, state.episodes[currentEpisode - 1].season, state.episodes[currentEpisode - 1].number, state.episodes[currentEpisode - 1].name, state.episodes[currentEpisode - 1].mediaPath, state.episodes[currentEpisode - 1].description, currentEpisode - 1, state.episodes.length, state.episodes);
            });

            nextButton.addEventListener('click', (e) => {
                const currentEpisode = Number(localStorage.getItem('lastSerial_' + id));
                e.preventDefault();
                this.setEpisodeData(id, state.episodes[currentEpisode + 1].season, state.episodes[currentEpisode + 1].number, state.episodes[currentEpisode + 1].name, state.episodes[currentEpisode + 1].mediaPath, state.episodes[currentEpisode + 1].description, currentEpisode + 1, state.episodes.length, state.episodes);
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

