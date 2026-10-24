// Guarda os arquivos do app para abrir rápido e funcionar sem internet.
// Os dados ficam no cache próprio do Firebase, não aqui.
// Prefixo próprio: o DinDin mora no mesmo domínio (github.io) e não pode apagar este cache, nem este o dele.
const PREFIXO = 'ryo-';
const CACHE = PREFIXO + 'v1';
const ARQUIVOS = ['./', './index.html', './styles.css', './app.js', './firebase-config.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/apple-touch-icon.png', './icons/emblema.png'];

self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith(PREFIXO) && k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  const guardar = r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return r; };
  if (u.origin === location.origin) {
    // só os arquivos deste app (o DinDin está no mesmo domínio, em outra pasta)
    if (!u.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
    // rede primeiro (pega atualizações), cache se estiver offline
    e.respondWith(fetch(e.request).then(guardar).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
  } else if (['www.gstatic.com', 'fonts.googleapis.com', 'fonts.gstatic.com'].includes(u.hostname)) {
    // bibliotecas e fontes: cache primeiro
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(guardar)));
  }
});
