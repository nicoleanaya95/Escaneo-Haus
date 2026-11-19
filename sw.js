/* Sube VERSION cada vez que cambies index.html para que el teléfono tome la versión nueva. */
var VERSION='escaneo-haus-v12';
var BASE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(VERSION).then(function(c){return c.addAll(BASE);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VERSION;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var u=new URL(e.request.url);if(u.origin!==location.origin)return;
  /* páginas: red primero (para ver cambios), caché si no hay internet */
  if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(VERSION).then(function(c){c.put(e.request,cp);});return r;}).catch(function(){return caches.match(e.request).then(function(m){return m||caches.match('index.html');});}));return;}
  /* resto (incluye la carpeta ocr/): caché primero, y se guarda la primera vez */
  e.respondWith(caches.match(e.request).then(function(m){return m||fetch(e.request).then(function(r){if(r.ok){var cp=r.clone();caches.open(VERSION).then(function(c){c.put(e.request,cp);});}return r;});}));
});
