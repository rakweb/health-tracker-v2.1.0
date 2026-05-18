const CACHE_NAME = "ht-v2.1.0";  // ✅ VERSION BUMP HERE

const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/css/base.css",
  "/css/theme-dark.css",
  "/css/theme-light.css",
  "/app.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

/* ✅ INSTALL */
self.addEventListener("install", (event) => {
  console.log("SW installing v2.1.0");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );

  self.skipWaiting();
});

/* ✅ ACTIVATE */
self.addEventListener("activate", (event) => {
  console.log("SW activating v2.1.0");

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

/* ✅ FETCH (Cache-first, network fallback) */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => {
          return caches.match("/index.html");
        })
      );
    })
  );
});
