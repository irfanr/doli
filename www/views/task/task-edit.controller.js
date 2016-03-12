angular.module('doli')
  .controller('TaskEditController', function($scope, $state, $stateParams, $ionicPlatform, Task, Category, Priority, Notification) {

    $scope.task = {};
    $scope.task.category_id = 1;
    $scope.task.priority_id = 4;
    $scope.enableReminder = false;
    $scope.task.reminder = new Date();
    $scope.categories = [];
    $scope.priorities = [];

    $scope.edit = function() {

      if (typeof $scope.task.category_id === "undefined") {
        $scope.task.category_id = 1;
      }
      if (typeof $scope.task.priority_id === "undefined") {
        $scope.task.priority_id = 4;
      }

      if ($scope.enableReminder) {

        console.log('before converted: ' + JSON.stringify($scope.task));
        $scope.task.reminder = new Date($scope.task.reminder).toISOString();
        console.log('convert reminder');
        console.log('edit task: ' + JSON.stringify($scope.task));
      } else {

        $scope.task.reminder = null;

      }

      Task.update($scope.task, $scope.task).then(function(result) {

        if ($scope.enableReminder === true) {

          Notification.add({
            id: $scope.task.id,
            message: $scope.task.title,
            at: new Date($scope.task.reminder)
          });

        }

        console.log("insertId: " + result.insertId);
        return result;
      });;
      $state.transitionTo('app.task');
    }

    $scope.submitWithCategory = function(category) {

      // console.log("submitWithCategory");

      $scope.task.category_id = category.id;

      $scope.edit();

    }

    $scope.enableReminderChanged = function() {
      if ($scope.enableReminder == false) {
        $scope.enableReminder = true;
      } else {
        $scope.enableReminder = false;
      }
    }

    $scope.$on('$ionicView.beforeEnter', function() {

      Task.get($stateParams.taskId).then(function(task) {
        $scope.task = task;

        if ($scope.task.reminder != null) {
          $scope.enableReminder = true;
        } else {
          $scope.enableReminder = false;
        }
      });

    });

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
