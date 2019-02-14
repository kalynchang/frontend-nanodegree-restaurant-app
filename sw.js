const cacheName = "restaurant-cache";

const cacheArray = [
  'css/styles.css',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'index.html',
  'restaurant.html',
];

// Installing service worker
self.addEventListener('install', (event) => {
  console.log('Service worker installed')
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheArray);
    }).then(() => {
      self.skipWaiting();
    }).catch((error) => {
      console.log('Caching resources failed')
    })
  );
});

// Activate service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Clearing cache");
            return caches.delete(cache);
          }
        })
      );
    }).catch((error) => {
      console.log('Clearing cache failed')
    })
  );
});

// Manage page requests
self.addEventListener('fetch', (event) => {
  console.log('Fetching');
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch((error) => {
      console.log('Failed to fetch');
    })
  );
});
