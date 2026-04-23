const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");

admin.initializeApp();

// Vi bruger .runWith for at styre ressourcerne og sikre Node 20 kompatibilitet
exports.sendChatNotification = functions.runWith({
  timeoutSeconds: 60,
  memory: '256MB'
}).database.ref("/global_chat/{messageId}")
    .onCreate(async (snapshot) => {
      const message = snapshot.val();
      const senderUid = message.uid;

      // 1. Hent alle tokens fra databasen
      const usersSnap = await admin.database().ref("users").once("value");
      const tokens = [];
      
      usersSnap.forEach((userSnap) => {
        const user = userSnap.val();
        const uid = userSnap.key;
        // Send til alle undtagen afsenderen selv
        if (user.fcmToken && uid !== senderUid) {
          tokens.push(user.fcmToken);
        }
      });

      if (tokens.length === 0) return null;

      // 2. Definer selve push-beskeden
      const payload = {
        notification: {
          title: `Ny besked fra ${message.name}`,
          body: message.text.length > 60 ? 
                message.text.substring(0, 57) + "..." : 
                message.text,
          icon: "/icon-192x192.png",
          badge: "/icon-192x192.png"
        },
      };

      // 3. Send via Firebase Cloud Messaging
      try {
        const response = await admin.messaging().sendToDevice(tokens, payload);
        console.log("Notifikationer sendt! Succes:", response.successCount);
        return null;
      } catch (error) {
        console.error("Fejl ved afsendelse:", error);
        return null;
      }
    });
