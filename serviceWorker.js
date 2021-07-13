const VERSION = 'v1';

self.addEventListener('install', event => {
    event.waitUntil(precache());
});
self.addEventListener('fetch', event => {
    const request = event.request;
    if(request.method !== 'GET'){
        return;
    }
    //search for the resource in cache
    event.respondWith(cachedResponse(request));
    //update the cache
    event.waitUntil(updateCache(request));
});

async function precache(){
    const cache = caches.open('VERSION');
    (await cache).addAll([
        '/',
        '/index.html',
        '/assets/index.js',
        '/assets/SimpleMediaPlayer.js',
        '/assets/plugins/AutoPlay.js',
        '/assets/plugins/AutoPause.js',
        '/assets/index.css',
        '/assets/video.mp4',
        ])
}

async function cachedResponse(request){
    const cache = await caches.open('VERSION');
    const response = await cache.match(request);
    //fetch(request) in case response is undefined
    return response || fetch(request);
}

async function updateCache(request){
    const cache = await caches.open('VERSION');
    const response = await fetch(request);
    return cache.put(request, response);
}
