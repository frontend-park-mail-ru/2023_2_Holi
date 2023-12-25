/**
 * Извлекает последнее число из строки, находящееся после последнего символа '/'.
 *
 * @param {string} string - Входная строка, содержащая числа и символ '/'.
 * @returns {string} - Последнее число из строки.
 */
export const getLastNumber = (string) => {
    return string.substring(string.lastIndexOf('/') + 1);
};
