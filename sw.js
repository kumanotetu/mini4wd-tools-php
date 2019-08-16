// This is the service worker with the Cache-first network

const CACHE = "tools_cache_v_0_2_1";
/* Add an array of files to precache for your app */
const precacheFiles = [
    "index.html",
    "/audio/coke_sound.wav",
    "/css/bootstrap.min.css",
    "/css/brake-setting-tool.css",
    "/images/icons/icon-72x72.png",
    "/images/icons/icon-96x96.png",
    "/images/icons/icon-128x128.png",
    "/images/icons/icon-144x144.png",
    "/images/icons/icon-152x152.png",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-384x384.png",
    "/images/icons/icon-512x512.png",
    "/js/bootstrap.min.js",
    "/js/brake-setting-tool.js",
    "/js/jquery-1.12.4.min.js"
];

self.addEventListener("install", function (event) {
    console.log("[PWA Builder] Install Event processing");
  
    console.log("[PWA Builder] Skip waiting on install");
    self.skipWaiting();
  
    event.waitUntil(
      caches.open(CACHE).then(function (cache) {
        console.log("[PWA Builder] Caching pages during install");
        return cache.addAll(precacheFiles);
      })
    );
  });
  
  // Allow sw to control of current page
  self.addEventListener("activate", function (event) {
    console.log("[PWA Builder] Claiming clients for current page");
    event.waitUntil(self.clients.claim());
  });
  
  // If any fetch fails, it will look for the request in the cache and serve it from there first
  self.addEventListener("fetch", function (event) { 
    if (event.request.method !== "GET") return;
  
    event.respondWith(
      fromCache(event.request).then(
        function (response) {
          // The response was found in the cache so we responde with it and update the entry
  
          // This is where we call the server to get the newest version of the
          // file to use the next time we show view
          event.waitUntil(
            fetch(event.request).then(function (response) {
              return updateCache(event.request, response);
            })
          );
  
          return response;
        },
        function () {
          // The response was not found in the cache so we look for it on the server
          return fetch(event.request)
            .then(function (response) {
              // If request was success, add or update it in the cache
              event.waitUntil(updateCache(event.request, response.clone()));
  
              return response;
            })
            .catch(function (error) {
              console.log("[PWA Builder] Network request failed and no cache." + error);
            });
        }
      )
    );
  });
  
  function fromCache(request) {
    // Check to see if you have it in the cache
    // Return response
    // If not in the cache, then return
    return caches.open(CACHE).then(function (cache) {
      return cache.match(request).then(function (matching) {
        if (!matching || matching.status === 404) {
          return Promise.reject("no-match");
        }
  
        return matching;
      });
    });
  }
  
  function updateCache(request, response) {
    return caches.open(CACHE).then(function (cache) {
      return cache.put(request, response);
    });
  }
