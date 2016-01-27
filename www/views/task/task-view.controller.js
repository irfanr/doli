angular.module('doli')
  .controller('TaskViewController', function($scope, $stateParams, Task) {

    Task.get($stateParams.taskId).then(function(task) {
      $scope.task = task;
    });

  });
