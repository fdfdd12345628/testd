var staticCacheName = 'djangopwa-v2';
/*importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log('workbox load');
} else {
  console.log('workbox not load');
}*/

/*workbox.routing.registerRoute(
  /\.js$/,
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  /\.css$/,
  new workbox.strategies.NetworkFirst()
);*/


self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                /*'./static/idb.js',
                './static/idbop.js',
                './base_layout',
                './manifest.json',
                './static/src/worldwide-72.png',
                'https://code.jquery.com/jquery-3.2.1.slim.min.js',
                'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js',
                'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css',*/
            ]);
        })
    );
});


self.addEventListener('fetch', function (event) {
    var requestUrl = new URL(event.request.url);
    /*if (requestUrl.origin === location.origin) {
        if ((requestUrl.pathname === '/')) {
            event.respondWith(caches.match('/base_layout'));
            return;
        }
    }*/
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );
});
