export const getLastNumber = (string) => {
    return string.substring(string.lastIndexOf('/') + 1);
};
