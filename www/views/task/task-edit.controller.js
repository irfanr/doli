angular.module('doli')
  .controller('TaskEditController', function($scope, $state, $stateParams, $ionicPlatform, Task) {

    $scope.task = {};

    $scope.edit = function() {
      Task.update($scope.task, $scope.task);
      $state.transitionTo('task');
    }

    $scope.$on('$ionicView.beforeEnter', function() {

      Task.get($stateParams.taskId).then(function(task) {
        $scope.task = task;
      });

    });

  });
