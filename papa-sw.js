const CACHE_NAME='trovalibro-papa-v2';
const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(url.origin!==location.origin)return;if(event.request.mode==='navigate'||url.pathname.endsWith('/index.html')){event.respondWith(fetch(event.request).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(event.request,copy));return res}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./index.html'))));return}event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)))});
