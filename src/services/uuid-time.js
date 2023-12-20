/**
 * Генерирует уникальный идентификатор (UUID) на основе текущего timestamp и случайного числа.
 *
 * @returns {string} Уникальный идентификатор.
 */
export const uuid = () => {
    const timestamp = new Date().getTime() + Math.random(); // Получаем текущий timestamp в миллисекундах
    const uniqueKey = `key-${timestamp}`;

    return uniqueKey;
};
