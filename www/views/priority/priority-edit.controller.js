angular.module('doli')
  .controller('PriorityEditController', function($scope, $state, $stateParams, $ionicPlatform, Priority) {

    $scope.priority = {};

    $scope.edit = function() {
      Priority.update($scope.priority, $scope.priority);
      $state.transitionTo('app.priority');
    }

    $scope.$on('$ionicView.beforeEnter', function() {

      Priority.get($stateParams.priorityId).then(function(priority) {
        $scope.priority = priority;
      });

    });

    $scope.$on('$ionicView.enter', function() {

      document.getElementById("name").focus();
      cordova.plugins.Keyboard.show();

    });

  });
