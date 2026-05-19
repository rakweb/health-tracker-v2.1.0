const VERSION = "v2.1.0";
const CACHE_NAME = `ht-${VERSION}`;

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/base.css",
  "./css/theme-dark.css",
  "./css/theme-light.css",
  "./css/range-slider.css",
  "./js/app.js",
  "./js/range-slider.js",
  "./icons/icon-192.png"
];

/* ✅ INSTALL */
self.addEventListener("install", (event) => {
  console.log("SW install:", VERSION);

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );

  self.skipWaiting();
});

/* ✅ ACTIVATE */
self.addEventListener("activate", (event) => {
  console.log("SW activate:", VERSION);

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

/* ✅ FETCH */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((res) => res || caches.match("./index.html"))
    )
  );
});
