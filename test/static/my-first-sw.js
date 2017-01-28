/* eslint-env serviceworker */
/* globals Request, Response */

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('install', (event) => {
  const promiseChain = caches.open('test-cache')
  .then((openCache) => {
    return openCache.put(
      new Request('/__test/example'),
      new Response('Hello, World!')
    );
  });
  event.waitUntil(promiseChain);
});

self.addEventListener('fetch', (event) => {
  event.respondWith(new Response('Hi from sw fetch event'));
});