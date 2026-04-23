const CACHE_NAME = 'smashpro-v3.5';
const assets = [
  './',
  './index.html',
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js',
  'https://www.gstatic.com/charts/loader.js'
];

// Importér Firebase scripts til Service Worker
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// INDSÆT DIN KONFIGURATION HER (Samme som i din index.html)
const firebaseConfig = {
  apiKey: "DIN_API_KEY",
  authDomain: "DIT_PROJEKT.firebaseapp.com",
  databaseURL: "https://DIT_PROJEKT.firebaseio.com",
  projectId: "DIT_PROJEKT",
  storageBucket: "DIT_PROJEKT.appspot.com",
  messagingSenderId: "DIT_SENDER_ID",
  appId: "DIT_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Baggrunds-håndtering: Hvad skal der ske når beskeden lander?
messaging.onBackgroundMessage((payload) => {
  console.log('Besked modtaget i baggrunden: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './icon-192x192.png', // Sørg for at denne fil findes
    badge: './badge-icon.png'   // Det lille ikon i statusbaren (Android)
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// --- Dine eksisterende Cache-funktioner ---
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
