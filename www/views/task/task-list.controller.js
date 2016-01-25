angular.module('doli')
  .controller('TaskListController', function($scope) {

    $scope.tasks = [{
      title: 'Task 1'
    }, {
      title: 'Task 2'
    }, {
      title: 'Task 3'
    }];

  });
