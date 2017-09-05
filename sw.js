// /** An empty service worker! */
// self.addEventListener('fetch', function(event) {
//   /** An empty fetch handler! */
// });

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('the-magic-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icon.png',
        '/site.js',
        '/style.css',
        '/sw.js'
      ]);
    })
  );
});
