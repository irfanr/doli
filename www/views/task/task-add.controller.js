angular.module('doli')
  .controller('TaskAddController', function($scope, $state, $ionicPlatform, Task) {

    $scope.task = {};

    $scope.create = function() {
      Task.add($scope.task);
      $state.transitionTo('task');
    }

  });
