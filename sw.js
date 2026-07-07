const CACHE_NAME = "malang-opic-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./assets/js/data.js",
  "./assets/js/storage.js",
  "./assets/js/practice.js",
  "./assets/js/journey.js",
  "./app.js",
  "./manifest.webmanifest",
  "./icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
