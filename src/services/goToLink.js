export const goToLink = (url) => {
    const a = document.createElement('a');
    a.href = '/' + url;
    a.setAttribute('data-link', '');
    document.body.appendChild(a);
    a.click()
    a.remove()
}