self.addEventListener('install', function(event) {
    console.log('Service Worker: Installing...');
    event.waitUntil(
      caches.open('budget-tracker-v1').then(function(cache) {
        return cache.addAll([
          './',
          './index.html',
          './login.js',
          './bootstrap/css/bootstrap.min.css',
          './icons/icon-192x192.png',
          './icons/icon-512x512.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  