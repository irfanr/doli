angular.module('doli')
  .controller('TaskAddController', function($scope, $state, $ionicPlatform, Task) {

    $scope.task = {};

    $scope.create = function() {
      Task.add($scope.task);
      $state.go('app.task');
    }

    $scope.$on('$ionicView.enter', function() {

      document.getElementById("title").focus();
      cordova.plugins.Keyboard.show();

    });


  });
