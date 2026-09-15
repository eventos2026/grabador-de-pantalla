// Service worker mínimo: Chrome exige uno registrado (con manejador de "fetch")
// para permitir instalar la app en la pantalla de inicio en vez de solo un acceso directo.
// No hace caché agresiva a propósito, así siempre ves la última versión publicada.
const CACHE_NAME = "inventario-shell-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Manejador de fetch "passthrough": solo intenta ir a la red;
// si falla (sin conexión) y ya está en caché, usa la copia guardada.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((cached) => cached || Response.error())
    )
  );
});
