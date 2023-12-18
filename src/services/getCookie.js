/**
 * Получает значение куки по имени.
 *
 * @param {string} name - Имя куки, значение которого нужно получить.
 * @returns {string|undefined} - Значение куки или undefined, если куки с указанным именем не найдено.
 */
export const getCookie = (name) => {
    const matches = document.cookie.match(
        // eslint-disable-next-line no-useless-escape
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
    );

    return matches ? decodeURIComponent(matches[1]) : undefined;
};
