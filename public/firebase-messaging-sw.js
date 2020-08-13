importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js"
);
firebase.initializeApp({
  apiKey: "AIzaSyAReYW888EY-cYMPhY1GZi_PB2XfYde_tM",
  authDomain: "chat-8bee7.firebaseapp.com",
  databaseURL: "https://chat-8bee7.firebaseio.com",
  projectId: "chat-8bee7",
  storageBucket: "chat-8bee7.appspot.com",
  messagingSenderId: "834156245052",
  appId: "1:834156245052:web:34e78e2490e6a733019339",
  measurementId: "G-R95PDSE503",
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notification = JSON.parse(payload.data.notification);
  const { body, title = "Techno-chatter", userName } = notification;

  const promiseChain = registration
    .getNotifications()
    .then((notifications) => {
      let currentNotification;

      for (let i = 0; i < notifications.length; i++) {
        if (
          notifications[i].data &&
          notifications[i].data.userName === userName
        ) {
          currentNotification = notifications[i];
        }
      }

      return currentNotification;
    })
    .then((currentNotification) => {
      let notificationTitle;
      const options = {};

      if (currentNotification) {
        // We have an open notification, let's do something with it.
        const messageCount = currentNotification.data.newMessageCount + 1;

        options.body = `You have ${messageCount} new messages from ${userName}.`;
        options.data = {
          userName,
          newMessageCount: messageCount,
        };
        notificationTitle = `New Messages from ${userName}`;

        // Remember to close the old notification.
        currentNotification.close();
      } else {
        options.body = `"${body}"`;
        options.data = {
          userName,
          newMessageCount: 1,
        };
        notificationTitle = `New Message from ${userName}`;
      }
      return registration.showNotification(notificationTitle, options);
    });
  return promiseChain;
});

self.addEventListener("notificationclick", function (event) {
  const urlToOpen = new URL("/", self.location.origin).href;
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});
