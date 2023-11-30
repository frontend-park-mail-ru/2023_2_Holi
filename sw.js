
const CACHE = 'offline-v1';

self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((currentCache) => {
            if (currentCache !== CACHE) {
              return caches.delete(currentCache);
            }
          })
        );
      })
    );
  });

self.addEventListener('fetch', (event) => {
    if (event.request.headers.get('range')) {
        return;
    }

    event.respondWith(caches.open(CACHE).then((cache) => {
        return fetch(event.request).then((fetchedResponse) => {
            if (event.request.method === 'GET') {
                cache.put(event.request, fetchedResponse.clone()).catch(err => console.info(err));
            }
            return fetchedResponse;
        }).catch(() => {
            return cache.match(event.request);
        });
    }));
});
