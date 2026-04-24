importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBzDeP_CdzJ7d-Y75edPt3g0OgK5-1_yGk",
  authDomain: "badmintonapp-6f2c3.firebaseapp.com",
  projectId: "badmintonapp-6f2c3",
  storageBucket: "badmintonapp-6f2c3.firebasestorage.app",
  messagingSenderId: "681145707894",
  appId: "1:681145707894:web:259251fc2ff3c89a4b9e57"
});

const messaging = firebase.messaging();

// Dette gør at notifikationen vises, selvom browseren er lukket
messaging.onBackgroundMessage((payload) => {
    console.log('Besked modtaget i baggrunden: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.png' // Sørg for at denne fil findes, eller brug et andet ikon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});