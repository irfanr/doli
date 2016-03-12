angular.module('doli')
  .controller('TaskAddController', function($scope, $state, $ionicPlatform, Task, Category, Priority, Notification) {

    $scope.task = {};
    $scope.task.category_id = 1;
    $scope.task.priority_id = 4;
    $scope.enableReminder = false;
    $scope.task.reminder = new Date();
    $scope.categories = [];
    $scope.priorities = [];

    // $scope.dateValue = new Date();
    // $scope.timeValue = new Date();
    // $scope.datetimeValue = new Date();

    $scope.create = function() {

      if (typeof $scope.task.category_id === "undefined") {
        $scope.task.category_id = 1;
      }
      if (typeof $scope.task.priority_id === "undefined") {
        $scope.task.priority_id = 4;
      }

      console.log('$scope.enableReminder' + $scope.enableReminder);

      if ($scope.enableReminder === true) {

        $scope.task.reminder = $scope.task.reminder.toISOString();
        console.log('convert reminder');
        console.log('create task: ' + JSON.stringify($scope.task));

      } else if ($scope.enableReminder === false) {

        console.log('reminder is null');

        $scope.task.reminder = null;

      }


      Task.add($scope.task).then(function(result) {

        if ($scope.enableReminder === true) {

          Notification.add({
            id: result.insertId,
            message: $scope.task.title,
            at: new Date($scope.task.reminder)
          });

        }

        console.log("insertId: " + result.insertId);
        return result;
      });
      // var a = Task.selectLastInsertRowId();
      // console.log('return: ' + JSON.stringify(a.insertId));
      $state.go('app.task');
    }

    $scope.submitWithCategory = function(category) {

      // console.log("submitWithCategory");

      $scope.task.category_id = category.id;

      $scope.create();

    }

    $scope.enableReminderChanged = function() {
      if ($scope.enableReminder == false) {
        $scope.enableReminder = true;
      } else {
        $scope.enableReminder = false;
      }
    }

    $scope.$on('$ionicView.enter', function() {

      Category.all().then(function(categories) {
        $scope.categories = categories;
      });

      Priority.all().then(function(priorities) {
        $scope.priorities = priorities;
        // console.log('priorities: ' + JSON.stringify($scope.priorities));
      });

      document.getElementById("title").focus();
      cordova.plugins.Keyboard.show();

    });


  });
