angular.module('doli')
  .controller('CategoryViewController', function($scope, $stateParams, Category) {

    Category.get($stateParams.categoryId).then(function(category) {
      $scope.category = category;
    });

  });
