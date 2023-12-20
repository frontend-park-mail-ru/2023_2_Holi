import { Notify } from '../components/notify/notify';
import { deleteRating, getRating, setRatingRequest } from './api/rating';

/**
 * Устанавливает обработчики событий для кнопок рейтинга.
 */
export const setRating = () => {
    checkUserRating();
    const ratingButtons = document.querySelectorAll('[data-rating]');

    // Навешиваем обработчик клика на каждый элемент с атрибутом data-rating
    ratingButtons.forEach(button => {
        button.addEventListener('click', handleRatingClick);
    });

    // Находим кнопку с атрибутом name="Remove rating"
    const removeRatingButton = document.querySelector('[name="Remove rating"]');
    // Навешиваем обработчик клика на кнопку с атрибутом name="Remove rating"
    removeRatingButton.addEventListener('click', handleRemoveRatingClick);
};

/**
 * Обработчик события клика по кнопке рейтинга.
 *
 * @param {Event} event - Объект события.
 */
function handleRatingClick(event) {
    // Получаем значение рейтинга из аттрибута data-rating
    const ratingValue = event.currentTarget.dataset.rating;
    const ratingButtons = document.querySelectorAll('[data-rating]');
    // Удаляем класс active со всех кнопок
    ratingButtons.forEach(button => {
        button.classList.remove('styles_activeRating');
    });

    // Добавляем класс active к текущей кнопке
    event.currentTarget.classList.add('styles_activeRating');
    const id = localStorage.getItem('LastContentId');
    // Отправляем запрос на установку рейтинга (замените URL на свой)
    setRatingRequest(ratingValue, id)
        .then(response => {
            // Обработка ответа (например, обновление интерфейса)
            if (response) {
                window.dialog.close();
                document.getElementById('rating').textContent = Number(response.body.rating).toFixed(1);

                return response;
            } else {
                new Notify('Ошибка при установке рейтинга');
            }
        })
        .catch(() => {
            new Notify('Произошла ошибка');
        });
}

/**
 * Обработчик события клика по кнопке удаления рейтинга.
 */
function handleRemoveRatingClick() {
    const id = localStorage.getItem('LastContentId');
    const ratingButtons = document.querySelectorAll('[data-rating]');
    // Удаляем класс active со всех кнопок
    ratingButtons.forEach(button => {
        button.classList.remove('styles_activeRating');
    });
    // Отправляем запрос на удаление рейтинга (замените URL на свой)
    deleteRating(id)
        .then(response => {
            // Обработка ответа (например, обновление интерфейса)
            if (response) {
                window.dialog.close();
                document.getElementById('rating').textContent = Number(response.body.rating).toFixed(1);

                return response;

            } else {
                new Notify('Произошла ошибка при удалении');
            }
        })
        .catch(() => {
            new Notify('Произошла ошибка');
        });
}

/**
 * Проверяет текущий рейтинг пользователя и обновляет интерфейс.
 */
function checkUserRating() {
    const ratingButtons = document.querySelectorAll('[data-rating]');
    const id = localStorage.getItem('LastContentId');
    getRating(id)
        .then(data => {
            if (data && data.body.isRated) {
                const userRating = data.body.rate;

                ratingButtons.forEach(button => {
                    button.classList.remove('styles_activeRating');
                });

                const correspondingButton = document.querySelector(`[data-rating="${userRating}"]`);
                if (correspondingButton) {
                    correspondingButton.classList.add('styles_activeRating');
                }
            }
        })
        .catch(() => {
            new Notify('Произошла ошибка при проверке рейтинга');
        });
}
