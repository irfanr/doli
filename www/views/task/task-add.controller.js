angular.module('doli')
  .controller('TaskAddController', function($scope, $state, $ionicPlatform, Task, Category, Priority) {

    $scope.task = {};
    $scope.task.category_id = 1;
    $scope.task.priority_id = 4;
    $scope.categories = [];
    $scope.priorities = [];

    $scope.create = function() {

      if (typeof $scope.task.category_id === "undefined") {
        $scope.task.category_id = 1;
      }
      if (typeof $scope.task.priority_id === "undefined") {
        $scope.task.priority_id = 4;
      }

      // console.log('create task: ' + JSON.stringify($scope.task));

      Task.add($scope.task);
      $state.go('app.task');
    }

    $scope.submitWithCategory = function(category) {

      // console.log("submitWithCategory");

      $scope.task.category_id = category.id;

      $scope.create();

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
