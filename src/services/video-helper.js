export const videoHelper = () => {
    // Получите все элементы <video> на странице
    const videoElements = document.querySelectorAll('.feed-collection__container-card');

    let isDragging = false;
    let prevDrag = false;

    videoElements.forEach((container) => {
        if (container) {
            const video = container.querySelector('video');

            container.addEventListener('mousedown', () => {
                isDragging = true;
            });

            container.addEventListener('mouseup', () => {
                isDragging = false;
            });

            container.addEventListener('click', () => {
                if (!isDragging && !prevDrag) {
                    // Остановка всех видео
                    videoElements.forEach((otherContainer) => {
                        const otherVideo = otherContainer.querySelector('video');
                        if (otherVideo !== video && !otherVideo.paused) {
                            otherVideo.pause();
                            otherVideo.setAttribute('autoplay', 'false');
                            otherVideo.preload = 'none';
                        }
                    });

                    video.preload = 'auto'; // Запустить загрузку видео
                    video.setAttribute('autoplay', '');
                    video.play();

                }
            });

            container.addEventListener('mousemove', () => {
                prevDrag = isDragging;
            });
        }

    });
};
