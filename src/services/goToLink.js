/**
 * Перенаправляет пользователя по указанной ссылке.
 * @param {string} url - URL, по которому нужно перенаправить пользователя.
 */
export const goToLink = (url) => {
    /*const a = document.createElement('a');
    a.href = '/' + url;
    a.setAttribute('data-link', '');
    document.body.appendChild(a);
    a.click();
    a.remove();*/

    window.location.href = '/' + url;
};
