angular.module('doli')
  .controller('TaskEditController', function($scope, $state, $stateParams, $ionicPlatform, Task, Category) {

    $scope.task = {};
    $scope.categories = [];

    $scope.edit = function() {
      Task.update($scope.task, $scope.task);
      $state.transitionTo('app.task');
    }

    $scope.submitWithCategory = function(category) {

      console.log("submitWithCategory");

      $scope.task.category_id = category.id;

      $scope.edit();

    }

    $scope.$on('$ionicView.beforeEnter', function() {

      Task.get($stateParams.taskId).then(function(task) {
        $scope.task = task;
      });

    });

    $scope.$on('$ionicView.enter', function() {

      Category.all().then(function(categories) {
        $scope.categories = categories;
      });

      document.getElementById("title").focus();
      cordova.plugins.Keyboard.show();

    });

  });
