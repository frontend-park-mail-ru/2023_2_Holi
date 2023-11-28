import { logoutRequest } from '../../../services/api/auth.js';
import { getLastNumber } from '../../../services/getParams.js';
import { navigate } from '../../../services/router/Router.js';
import serial from './serials-content.hbs';
import { setLike } from '../../../services/api/like.js';
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

            document.getElementById('duration').innerText = (`${hours} часов ${minutes} минут`);
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

            document.getElementById('logout').addEventListener('click', async function () {
                const response = await logoutRequest();
                if (response.ok) {
                    navigate('/login');
                }
            });

            document.querySelector('.heart-button').addEventListener('click', () => {
                setLike(id);
            });
            videoController();

            avatarUpdate();

        });

        /* const prevLink = document.getElementById('prev-button');
         const nextLink = document.getElementById('next-button');
         const { previous, next } = getAdjacentElements(idsArray, Number(id));
         prevLink.href = previous ? `/movies/${previous}` : `/movies/${id}`;
         nextLink.href = next ? `/movies/${next}` : `/movies/${id}`;*/
        //document.querySelector('.heart-button').addEventListener('click', () => {
        //     setLike(id);
        // });
        //videoController();

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

