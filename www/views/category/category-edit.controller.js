angular.module('doli')
  .controller('CategoryEditController', function($scope, $state, $stateParams, $ionicPlatform, Category) {

    $scope.category = {};

    $scope.edit = function() {
      Category.update($scope.category, $scope.category);
      $state.transitionTo('app.category');
    }

    $scope.$on('$ionicView.beforeEnter', function() {

      Category.get($stateParams.categoryId).then(function(category) {
        $scope.category = category;
      });

    });

    $scope.$on('$ionicView.enter', function() {

      document.getElementById("name").focus();
      cordova.plugins.Keyboard.show();

    });

  });
