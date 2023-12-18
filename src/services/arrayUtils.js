/**
 * Возвращает предыдущий и следующий элементы в массиве относительно заданного значения.
 *
 * @param {Array} arr - Массив элементов.
 * @param {*} value - Значение, относительно которого нужно найти соседей.
 * @returns {{previous: *, next: *}} - Объект с предыдущим и следующим элементами.
 */
export const getAdjacentElements = (arr, value) => {
    const index = arr.indexOf(value);

    if (index === -1) {
        return { previous: null, next: null };
    }

    const previous = index > 0 ? arr[index - 1] : null;
    const next = index < arr.length - 1 ? arr[index + 1] : null;

    return { previous, next };
};
