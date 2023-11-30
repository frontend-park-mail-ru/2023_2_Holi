import { searchRequest } from './api/search';
import { debounce } from './debounce';
import {Notify} from "../components/notify/notify";

// Функция для выполнения запроса на сервер
export function fetchData(query) {
    // Здесь вы можете выполнить запрос на сервер с использованием fetch или других средств
    // В данном примере используем console.log вместо реального запроса
    if (query && query.length > 1) {
        searchRequest(query)
            .then(response => {
                updateDropdownList(response);
            });
    }

}

// Функция для обновления выпадающего списка
export function updateDropdownList(results) {
    const dropdownList = document.getElementById('dropdown-list');
    document.getElementById('search-list').classList.add('visible');
    dropdownList.innerHTML = '';

    if (!results) {
        const ladel = document.createElement('li');
        ladel.className = 'dropdown-item';
        ladel.textContent = 'Ничего не нашлось:(';
        dropdownList.appendChild(ladel);
    }
    const data = results.body;

    if (data.cast) {
        const ladel = document.createElement('li');
        ladel.className = 'dropdown-item';
        ladel.textContent = 'Актеры';
        dropdownList.appendChild(ladel);
        data.cast.forEach(result => {
            const listItem = document.createElement('li');
            listItem.className = 'dropdown-item';
            const a = document.createElement('a');
            a.textContent = result.name;
            a.setAttribute('spa-link', '');
            a.href = `/cast/${result.id}`;
            listItem.appendChild(a);
            dropdownList.appendChild(listItem);
        });
    }
    if (data.films) {
        const ladel = document.createElement('li');
        ladel.className = 'dropdown-item';
        ladel.textContent = 'Фильмы/Сериалы';
        dropdownList.appendChild(ladel);
        data.films.forEach(result => {
            const listItem = document.createElement('li');
            listItem.className = 'dropdown-item';
            const a = document.createElement('a');
            a.textContent = result.name;
            if (result.seasonsCount === 0) {
                a.href = `/movies/${result.id}`;
            } else {
                a.href = `/serial/${result.id}`;
            }

            listItem.appendChild(a);
            dropdownList.appendChild(listItem);
        });
    }
}

export function seachHandler() {
    const inputSearch = document.querySelector('.input-search');
    if (inputSearch) {
        // Добавляем обработчик события oninput с использованием debounce
        inputSearch.addEventListener('input', debounce(function (event) {
            if (!navigator.onLine) {
                new Notify('Нет соединения');
            }
            const query = event.target.value;
            fetchData(query);
        }, 300));

        inputSearch.addEventListener('blur', () => {
            const dropdownList = document.getElementById('dropdown-list');
            inputSearch.value = '';
            setTimeout(() => {
                dropdownList.innerHTML = '';
            }, 800);

        });
    }
}
