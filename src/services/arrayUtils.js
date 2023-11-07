export const getAdjacentElements = (arr, value) => {
    const index = arr.indexOf(value);

    if (index === -1) {
        return { previous: null, next: null };
    }

    const previous = index > 0 ? arr[index - 1] : null;
    const next = index < arr.length - 1 ? arr[index + 1] : null;

    return { previous, next };
};
