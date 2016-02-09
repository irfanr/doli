angular.module('doli')
  .controller('PriorityViewController', function($scope, $stateParams, Priority) {

    Priority.get($stateParams.priorityId).then(function(priority) {
      $scope.priority = priority;
    });

  });
