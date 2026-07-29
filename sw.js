const CACHE_NAME = "pesca-app-v8";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192-192.png",
  "./icon-512-512.png",
  "./img/splash-bg.jpg",
  "./img/splash-anim.mp4"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const url = event.request.url;
  // Le previsioni meteo devono sempre essere aggiornate da internet
  if (url.includes("api.open-meteo.com") || url.includes("marine-api.open-meteo.com")) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => {
      return (
        cached ||
        fetch(event.request)
          .then(response => {
            if (event.request.method === "GET" && response.status === 200) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            }
            return response;
          })
          .catch(() => cached)
      );
    })
  );
});
