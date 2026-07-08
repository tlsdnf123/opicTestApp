const CACHE_NAME = "malang-opic-v27";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=27",
  "./assets/js/data.js?v=27",
  "./assets/js/storage.js?v=27",
  "./assets/js/practice.js?v=27",
  "./assets/js/journey.js?v=27",
  "./app.js?v=27",
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
