const VERSION = "v2.1.0";
const CACHE_NAME = `ht-${VERSION}`;

const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/app.js",
  "/css/base.css",
  "/css/theme-dark.css",
  "/css/theme-light.css",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

/* ✅ INSTALL */
self.addEventListener("install", (event) => {
  console.log("SW installing:", VERSION);

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );

  self.skipWaiting(); // 🔥 instant install
});

/* ✅ ACTIVATE */
self.addEventListener("activate", (event) => {
  console.log("SW activating:", VERSION);

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

  self.clients.claim(); // 🔥 immediate control
});

/* ✅ FETCH */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => caches.match("/index.html"))
      );
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
