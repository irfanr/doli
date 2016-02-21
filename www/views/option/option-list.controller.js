angular.module('doli')
  .controller('OptionListController', function($scope, $rootScope, Category) {

    $rootScope.options = {
      doneTaskVisible: false,
      selectedCategory: 'ALL'
    };

    $scope.doneTaskVisibleChanged = function() {

      console.log('doneTaskVisibleChanged');

      $rootScope.$broadcast('doneTaskVisibleChanged');

    };

    $scope.selectedCategoryChanged = function() {

      console.log('selectedCategoryChanged');

      $rootScope.$broadcast('selectedCategoryChanged');

    };

    Category.all().then(function(categories) {
      $scope.categories = categories;
    });

  });
