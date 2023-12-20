/**
 * Возвращает функцию, которая задерживает вызов переданной функции на указанный интервал времени после последнего вызова.
 *
 * @param {Function} func - Функция, вызов которой нужно задержать.
 * @param {number} delay - Время задержки в миллисекундах.
 * @returns {Function} - Новая функция с задержкой.
 */

export function debounce(func, delay) {
    let timeoutId;

    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
