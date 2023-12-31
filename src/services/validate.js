export const validatePassword = (password) => {
    // Проверка длины пароля (минимальная длина 8 символов)
    if (password.length < 8) {
        return 'Пароль должен содержать минимум 8 символов';
    }

    // eslint-disable-next-line no-constant-condition
    if(/[\uD800-\uDFFF]/.test(password)){
        return 'Без emoji пожалуйста';
    }
    // Проверка наличия хотя бы одной заглавной буквы
    if (!/[A-Z]/.test(password)) {
        return 'Пароль должен содержать хотя бы одну заглавную букву';
    }

    // Проверка наличия хотя бы одной строчной буквы
    if (!/[a-z]/.test(password)) {
        return 'Пароль должен содержать хотя бы одну строчную букву';
    }

    // Проверка наличия хотя бы одной цифры
    if (!/[0-9]/.test(password)) {
        return 'Пароль должен содержать хотя бы одну цифру';
    }

    return '';
};
