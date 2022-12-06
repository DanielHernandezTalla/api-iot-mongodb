// Asignar un nombre y version al cache
const CACHE_NAME = "v1_cache_things_IOT";
const URLsToCache = ["./", "./style.css", "./app.js", "./favicon.ico"];

// durante la face de instalacion
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(URLsToCache).then(() => self.skipWaiting());
            })
            .catch((err) => {
                console.warn("Fallo el registro de cache", err);
            })
    );
});

// Una ves que se instala, se activa y busca los recursos para hacer que funcione sin conexion
self.addEventListener("activate", (e) => {
    const cacheWhitheList = [CACHE_NAME];
    e.waitUntil(
        caches
            .keys()
            .then((cachesNames) => {
                cachesNames.map((cacheName) => {
                    // Eliminamos lo que ya no se necesita en el cache
                    if (cacheWhitheList.indexOf(cacheName) === -1)
                        return caches.delete(cacheName);
                });
            })
            .then(() => {
                self.clients.claim();
            })
    );
});

// Cuando el navegador recupera una url
self.addEventListener("fetch", (e) => {
    // Responde con los objetos de la cache
    e.respondWith(
        caches.match(e.request).then((res) => {
            if (res) {
                // recuperando del cache
                return res;
            }

            // recupera datos de internet
            return fetch(e.request);
        })
    );
});
