const CACHE_NAME = 'offline-v1';

self.addEventListener('fetch', (event) => {
    // Check if this is a request for an image
    if (event.request.destination !== 'video') {
        event.respondWith(caches.open(CACHE_NAME).then((cache) => {
            // Go to the cache first
            return cache.match(event.request.url).then((cachedResponse) => {
                // Return a cached response if we have one
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Otherwise, hit the network
                return fetch(event.request)
                    .then((fetchedResponse) => {
                        // Add the network response to the cache for later visits
                        cache.put(event.request.url, fetchedResponse.clone());

                        // Return the network response
                        return fetchedResponse;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            })
                .catch((err) => {
                    console.log(err)
                });

        }));
    } else {
        return;
    }
});


// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request)
//             .then(response => {
//                 if (response) {
//                     return response;
//                 }
//                
//                 return fetch(event.request).then(res => {
//                         return caches.open('dynamic')
//                             .then(cache => {
//                                 cache.put(event.request.url, res.clone());
//                                 return res;
//                             })
//                     });
//             })
//     );
// });
