const IMAGE_CACHE_NAME = "yeomsydney-images-v1";

/* Install */
self.addEventListener("install", () => {
    self.skipWaiting();
});

/* Activate */
self.addEventListener("activate", () => {
    self.clients.claim();
});

/* Fetch */
self.addEventListener("fetch", (event) => {
    // Only handle images
    if (event.request.destination !== "image") return;

    event.respondWith(
        caches.open(IMAGE_CACHE_NAME).then((cache) =>
            cache.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request).then((networkResponse) => {
                    // Safety check
                    if (!networkResponse || networkResponse.status !== 200) {
                        return networkResponse;
                    }

                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            })
        )
    );
});