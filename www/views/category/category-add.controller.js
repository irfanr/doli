angular.module('doli')
  .controller('CategoryAddController', function($scope, $state, $ionicPlatform, Category) {

    $scope.category = {};

    $scope.create = function() {
      Category.add($scope.category);
      $state.go('app.category');
    }

    $scope.$on('$ionicView.enter', function() {

      document.getElementById("name").focus();
      cordova.plugins.Keyboard.show();

    });


  });
