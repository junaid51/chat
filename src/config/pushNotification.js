//---register the Service Worker---
// window.addEventListener("load", (e) => {
//   if (!("serviceWorker" in navigator)) {
//     console.log("Service worker not supported");
//     return;
//   }
//   console.log(navigator.serviceWorker);
//   navigator.serviceWorker
//     .register("./serviceWorker.js")
//     .then(function () {
//       console.log("Service Worker Registered");
//     })
//     .catch(function (error) {
//       console.log("Service Worker Registration failed:", error);
//     });
// });

//---Update the Push Notification Status---
// function updatePushNotificationStatus(status) {
//     pushElement.dataset.checked = status;
//     if (status) {
//         pushImage.src = 'button_on.png';
//     }
//     else {
//         pushImage.src = 'button_off.png';
//     }
// }

function checkIfPushIsEnabled() {
  //---check if push notification permission
  // has been denied by the user---
  console.log("here");
  if (Notification.permission === "denied") {
    console.log("User has blocked push notification.");
    return;
  }
  //---check if push notification is
  // supported or not---
  if (!("PushManager" in window)) {
    console.log("Sorry, Push notification is not supported on this browser.");
    return;
  }
  //---get push notification subscription
  // if serviceWorker is registered and ready---
  navigator.serviceWorker.ready.then(function (registration) {
    console.log("readyyyy");
    registration.pushManager
      .getSubscription()
      .then(function (subscription) {
        console.log(subscription);
        if (subscription) {
          console.log(subscription);
          //---user is currently subscribed to push---
          //   updatePushNotificationStatus(true);
        } else {
          //---user is not subscribed to push---
          //   updatePushNotificationStatus(false);
        }
      })
      .catch(function (error) {
        console.error("Error occurred enabling push ", error);
      });
  });
}

//---subscribe to push notification---
function subscribeToPushNotification() {
  console.log("here");
  navigator.serviceWorker.ready.then(function (registration) {
    if (!registration.pushManager) {
      console.log("This browser does not support push notification.");
      return false;
    }
    //---to subscribe push notification using
    // pushmanager---
    registration.pushManager
      .subscribe(
        //---always show notification when received---
        { userVisibleOnly: true }
      )
      .then(function (subscription) {
        console.log("Push notification subscribed.");
        console.log(subscription);
        // updatePushNotificationStatus(true);
      })
      .catch(function (error) {
        // updatePushNotificationStatus(false);
        console.error("Push notification subscription error: ", error);
      });
  });
}

//---unsubscribe from push notification---
function unsubscribeFromPushNotification() {
  navigator.serviceWorker.ready.then(function (registration) {
    registration.pushManager
      .getSubscription()
      .then(function (subscription) {
        if (!subscription) {
          console.log("Unable to unsubscribe from push notification.");
          return;
        }
        subscription
          .unsubscribe()
          .then(function () {
            console.log("Push notification unsubscribed.");
            console.log(subscription);
            // updatePushNotificationStatus(false);
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error("Failed to unsubscribe push " + "notification.");
      });
  });
}

//---get references to the UI elements---
// var pushElement = document.querySelector(".push");
// var pushImage = document.querySelector(".image");

//---event handler for the push button---
// pushElement.addEventListener("click", function () {
//---check if you are already subscribed to push
// notifications---
//   if (pushElement.dataset.checked === "true") {
// unsubscribeFromPushNotification();
//   } else {
//   }
// });

//---check if push notification is supported---
// checkIfPushIsEnabled();
subscribeToPushNotification();
