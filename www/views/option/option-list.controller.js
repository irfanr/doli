angular.module('doli')
  .controller('OptionListController', function($scope, $rootScope) {

    $rootScope.options = {
      doneTaskVisible: true
    };

    $scope.doneTaskVisibleChanged = function() {

      console.log('doneTaskVisibleChanged');

      $rootScope.$broadcast('doneTaskVisibleChanged');

    };

  });
