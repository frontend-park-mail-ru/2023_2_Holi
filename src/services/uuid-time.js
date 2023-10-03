export const uuid = () => {
    const timestamp = new Date().getTime() + Math.random(); // Получаем текущий timestamp в миллисекундах
    const uniqueKey = `key-${timestamp}`;
    return uniqueKey;
}