import { searchRequest } from './api/search';
import { debounce } from './debounce';

// Функция для выполнения запроса на сервер
export function fetchData(query) {
    // Здесь вы можете выполнить запрос на сервер с использованием fetch или других средств
    // В данном примере используем console.log вместо реального запроса
    if (query) {
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
        data.cast.forEach(result => {
            const ladel = document.createElement('li');
            ladel.className = 'dropdown-item';
            ladel.textContent = 'Актеры';
            dropdownList.appendChild(ladel);
            const listItem = document.createElement('li');
            listItem.className = 'dropdown-item';
            const a = document.createElement('a');
            a.textContent = result.name;
            a.href = `/cast/${result.id}`;
            listItem.appendChild(a);
            dropdownList.appendChild(listItem);
        });
    }
    if (data.films) {
        data.films.forEach(result => {
            const ladel = document.createElement('li');
            ladel.className = 'dropdown-item';
            ladel.textContent = 'Фильмы';
            dropdownList.appendChild(ladel);
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
            const query = event.target.value;
            fetchData(query);
        }, 1000));

        inputSearch.addEventListener('blur', () => {
            const dropdownList = document.getElementById('dropdown-list');
            setTimeout(() => {
                dropdownList.innerHTML = '';
            }, 500);

        });
    }
}
