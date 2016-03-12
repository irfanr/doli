angular.module('doli')
  .factory('Notification', function($ionicPlatform, $cordovaLocalNotification, $cordovaVibration) {

    var self = this;

    self.add = function(notification) {
      var now = new Date();
      now.setSeconds(now.getSeconds() - 10);
      if (notification.at < now) {
        console.log(notification.at + " is less than " + now);
        notification.at = new Date();
      }

      $cordovaLocalNotification.schedule({
        id: notification.id,
        at: notification.at,
        title: "Doli",
        icon: 'file://icon.png',
        text: notification.message,
        data: notification
      }).then(function() {
        // console.log("The notification <" + notification.id + "," + notification.message + "> has been set at " + notification.at);
      });
    };


    $ionicPlatform.ready(function() {

      // Start when application first starts


    });

    return self;

  });
