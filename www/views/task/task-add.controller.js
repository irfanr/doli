angular.module('doli')
  .controller('TaskAddController', function($scope, $state, $ionicPlatform, Task, Category) {

    $scope.task = {};
    $scope.categories = [];

    $scope.create = function() {

      if (typeof $scope.task.category_id === "undefined") {
        $scope.task.category_id = 1;
      }

      Task.add($scope.task);
      $state.go('app.task');
    }

    $scope.submitWithCategory = function(category) {

      console.log("submitWithCategory");

      $scope.task.category_id = category.id;

      $scope.create();

    }

    $scope.$on('$ionicView.enter', function() {

      Category.all().then(function(categories) {
        $scope.categories = categories;
      });

      document.getElementById("title").focus();
      cordova.plugins.Keyboard.show();

    });


  });
