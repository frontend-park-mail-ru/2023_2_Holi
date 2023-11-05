const CACHE_NAME = 'offline-v1';

const cashTypes = new Map([
    ['document', true],
    ['font', true],
    ['image', true],
    ['manifest', true],
    ['object', true],
    ['script', true],
    ['style', true],
    ['embed', true],
]);

// self.addEventListener('fetch', (event) => {
//     if (/*cashTypes.get(event.request.destination) !== undefined*/ event.request.destination !== 'video') {
//         event.respondWith(caches.open(CACHE_NAME).then((cache) => {
//             return cache.match(event.request.url).then((cachedResponse) => {
//                 if (cachedResponse) {
//                     return cachedResponse;
//                 }
//
//                 return fetch(event.request)
//                     .then((fetchedResponse) => {
//                         cache.put(event.request.url, fetchedResponse.clone());
//
//                         return fetchedResponse;
//                     })
//                     .catch((err) => {
//                         console.log(err)
//                     });
//             })
//                 .catch((err) => {
//                     console.log(err)
//                 });
//
//         }));
//     } else {
//         return;
//     }
// });

self.addEventListener('fetch', (event) => {
    if (event.request.destination !== 'video') {
        event.respondWith(caches.open(CACHE_NAME).then((cache) => {
            return fetch(event.request).then((fetchedResponse) => {
                cache.put(event.request.url, fetchedResponse.clone()).catch(err => console.log(err));

                return fetchedResponse;
            }).catch(() => {
                return cache.match(event.request.url);
            });
        }));
    }
});

