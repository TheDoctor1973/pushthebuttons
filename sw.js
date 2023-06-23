//Register the Service Worker

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/sw.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  });
}

//Cache the Assets

const staticPTB = "Push-the-Buttons"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/js/buttons.js",
  "/images/HomeV2.svg",
  "/images/Custom.svg",
  "/images/Friends.svg",
  "/images/Login.svg",
  "/images/news.svg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticPTB).then(cache => {
      cache.addAll(assets)
    })
  )
});

//Fetch the Assets

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
});

//Web badging API

if (navigator.setAppBadge) {
    console.log("The App Badging API is supported!");
}

// To display an empty badge
navigator.setAppBadge();

// To display a number in the badge
navigator.setAppBadge(3);





