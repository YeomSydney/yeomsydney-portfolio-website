const CACHE_NAME = "yeomsydney-v2"; // bump version
const IMAGE_CACHE_NAME = "yeomsydney-images-v2"; // bump version
const ASSETS = [
    "/",
    "/index.html",
    "/public/css/main.css",
    "/public/js/style.js",
    "/public/js/components/url.js",
    "/public/js/components/footer.js",
    "/public/js/components/search.js",
    "/favicon.ico",
    "/favicon-16x16.png",
    "/favicon-32x32.png",
    "/favicon-light-ui.svg",
    "/favicon-dark-ui.svg",
    "/apple-touch-icon.png",
    "/android-chrome-192x192.png",
    "/android-chrome-512x512.png"
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME && key !== IMAGE_CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});