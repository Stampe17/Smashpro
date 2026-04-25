importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBzDeP_CdzJ7d-Y75edPt3g0OgK5-1_yGk",
    authDomain: "badmintonapp-6f2c3.firebaseapp.com",
    projectId: "badmintonapp-6f2c3",
    storageBucket: "badmintonapp-6f2c3.firebasestorage.app", // Opdateret
    messagingSenderId: "681145707894",
    appId: "1:681145707894:web:259251fc2ff3c89a4b9e57"
});

const messaging = firebase.messaging();

// Denne del kører, når appen er i baggrunden (skærmen er slukket eller du er i en anden app)
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Baggrundsbesked modtaget: ', payload);
    
    const notificationTitle = payload.notification.title || "Ny besked i SmashPro";
    const notificationOptions = {
        body: payload.notification.body || "Du har modtaget en ny besked.",
        icon: 'icon.png', // Ret til dit faktiske ikon-navn
        badge: 'icon.png', // Den lille prik/ikon i statusbaren
        vibrate: [200, 100, 200] // Giver mobilen et lille "badminton-vibrer"
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
