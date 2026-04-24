importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBzDeP_CdzJ7d-Y75edPt3g0OgK5-1_yGk", // Find den i din index.html
    authDomain: "badmintonapp-6f2c3.firebaseapp.com",
    projectId: "badmintonapp-6f2c3",
    storageBucket: "badmintonapp-6f2c3.appspot.com",
    messagingSenderId: "681145707894", // Find den i index.html
    appId: "1:681145707894:web:259251fc2ff3c89a4b9e57" // Find den i index.html
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.png' 
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
