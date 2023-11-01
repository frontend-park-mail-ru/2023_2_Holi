import routes from './index.js';

const CACHE_NAME = 'offline-v1';

this.addEventListener('install', (event) => {
    event.waitUntil(
        // по ключу или открываем, или создаем хранилище
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(routes.map(r=> r.path));
            })
    );
});
