angular.module('doli')
  .controller('CategoryListController', function($scope, $state, $ionicPlatform, $cordovaSQLite, Category, $ionicModal, $ionicActionSheet) {

    $scope.selectedCategory = {};

    $ionicModal.fromTemplateUrl('category-delete-confirm.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.categories = [];

    $scope.onHold = function(category) {

      $ionicActionSheet.show({
        titleText: category.name,
        buttons: [{
          text: '<i class="icon ion-edit"></i> Edit'
        }, ],
        destructiveText: '<i class="icon ion-trash-b"></i> Delete',
        cancelText: 'Cancel',
        cancel: function() {
          // console.log('CANCELLED');
        },
        buttonClicked: function(index) {
          // console.log('BUTTON CLICKED '+index, index);
          if (index === 0) {

            $state.transitionTo('app.category-edit', {
              categoryId: category.id
            });

          }
          return true;
        },
        destructiveButtonClicked: function() {
          $scope.confirmDelete(category);
          return true;
        }
      });


    }

    $scope.insert = function(title) {
      var query = "INSERT INTO categorys (title) VALUES (?)";
      $cordovaSQLite.execute(db, query, [title]).then(function(res) {
        console.log("INSERT ID -> " + res.insertId);
      }, function(err) {
        console.error("ERROR: " + err);
      });
    }

    $scope.selectAll = function() {

      Category.all().then(function(categories) {
        $scope.categories = categories;
      });

    }

    $scope.confirmDelete = function(category) {
      $scope.selectedCategory = category;
      $scope.openModal();
    }

    $scope.delete = function() {
      Category.remove($scope.selectedCategory);
      $scope.selectAll();
      $scope.closeModal();
    }

    $ionicPlatform.ready(function() {

      Category.all().then(function(categories) {
        $scope.categories = categories;
      });

      console.log(JSON.stringify($scope.categories));

      // $scope.selectAll();

    });

    $scope.$on('$ionicView.beforeEnter', function() {

      Category.all().then(function(categories) {
        $scope.categories = categories;

        console.log(JSON.stringify($scope.categories));

      });

    });

  });
