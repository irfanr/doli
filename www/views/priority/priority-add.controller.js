angular.module('doli')
  .controller('PriorityAddController', function($scope, $state, $ionicPlatform, Priority) {

    $scope.priority = {};

    $scope.create = function() {
      Priority.add($scope.priority);
      $state.go('app.priority');
    }

    $scope.$on('$ionicView.enter', function() {

      document.getElementById("name").focus();
      cordova.plugins.Keyboard.show();

    });


  });
