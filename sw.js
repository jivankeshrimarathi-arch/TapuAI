const CACHE = "tapuai-v1";
const SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (e)=>{
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (e)=>{
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e)=>{
  const url = new URL(e.request.url);
  // Never cache API calls — always go to network
  if (url.origin !== self.location.origin){
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(networkRes => {
        if (e.request.method === "GET" && networkRes.ok){
          const clone = networkRes.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return networkRes;
      }).catch(()=> cached);
      return cached || fetchPromise;
    })
  );
});
