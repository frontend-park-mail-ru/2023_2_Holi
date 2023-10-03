import { FeedContentMain } from "./components/content/feed-content-main.js";
import { GenreRow } from "./components/content/genre/genre.js";
import { FeedHeader } from "./components/header/header.js";
import { uuid } from "../../services/uuid-time.js";
import { FeedFooter } from "./components/footer/footer.js";
import { logoutRequest } from "../../services/api/auth.js";
import { goToLink } from "../../services/goToLink.js";
import { getGenreFilms } from "../../services/api/genre.js";


const witcherImage = 'The-Witcher-3-season-2022.jpg';

const popFilms = [
    {
        img: 'static/genre/pop/witcher.jpg',
        id: '35t35trgvrv'
    },
    {
        img: 'static/genre/pop/dune.jpg',
        id: 'es6hts5gwwrrv'
    },
    {
        img: 'static/genre/pop/foundation.jpeg',
        id: 'rbsfvrv5g'
    },
    {
        img: 'static/genre/pop/gameofthrones.jpg',
        id: '84ghrunvjsi48fn'
    },
    {
        img: 'static/genre/pop/witcher.jpg',
        id: '35t35trgvrv'
    },
    {
        img: 'static/genre/pop/dune.jpg',
        id: 'es6hts5gwwrrv'
    },
    {
        img: 'static/genre/pop/foundation.jpeg',
        id: 'rbsfvrv5g'
    },
    {
        img: 'static/genre/pop/gameofthrones.jpg',
        id: '84ghrunvjsi48fn'
    },
    {
        img: 'static/genre/pop/witcher.jpg',
        id: '35t35trgvrv'
    },
    {
        img: 'static/genre/pop/dune.jpg',
        id: 'es6hts5gwwrrv'
    },
    {
        img: 'static/genre/pop/foundation.jpeg',
        id: 'rbsfvrv5g'
    },
    {
        img: 'static/genre/pop/gameofthrones.jpg',
        id: '84ghrunvjsi48fn'
    }
]
export class FeedPage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }
    addRow(title, content) {
        const genre = document.createElement('div');
        const id_carousel = uuid();
        const id_container = uuid();
        genre.innerHTML = new GenreRow(title, content, id_carousel, id_container).render();
        this.#parent.appendChild(genre);
        dragging(id_carousel, id_container);
    }

    async render() {
        await getGenreFilms('Dramas')
        this.#parent.innerHTML = '';
        this.#parent.style.background = '';
        const header = document.createElement('div')
        header.innerHTML = new FeedHeader().render();
        this.#parent.appendChild(header)

        const mainContent = document.createElement('div');
        mainContent.innerHTML = new FeedContentMain(witcherImage).render();
        this.#parent.appendChild(mainContent)


        this.addRow('Популярное', popFilms);
        this.addRow('Популярное', popFilms);
        this.addRow('Популярное', popFilms);
        this.addRow('Популярное', popFilms);


        const footer = document.createElement('div');
        footer.innerHTML = new FeedFooter().render();
        this.#parent.appendChild(footer);

        goToFilms();

       

        document.getElementById('logout').addEventListener('click', async function(){
            const response = await logoutRequest();
            console.log(response)
            if(response.ok){
                goToLink('login');
            }
        })
    }


}

const goToFilms = () => {
    const genreCardLinks = document.querySelectorAll('.genre-card-link');
    genreCardLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('data-id');
            history.pushState(null, null, id);
        });
    });
}
const dragging = (carousel_id, container) => {
    console.log(carousel_id)
    const carousel = document.getElementById(carousel_id);
    const wrapper = document.getElementById(container);
    let isDragging = false;
    let startX, scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    carousel.addEventListener('mouseup', () => {
        isDragging = false;
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 1; // Увеличьте число, чтобы увеличить скорость перемещения
        wrapper.scrollLeft = scrollLeft - walk;
    });
}