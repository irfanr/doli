angular.module('doli')
  .controller('PriorityListController', function($scope, $state, $ionicPlatform, $cordovaSQLite, Priority, $ionicModal, $ionicActionSheet) {

    $scope.selectedPriority = {};

    $ionicModal.fromTemplateUrl('priority-delete-confirm.html', {
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

    $scope.onHold = function(priority) {

      $ionicActionSheet.show({
        titleText: priority.name,
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

            $state.transitionTo('app.priority-edit', {
              priorityId: priority.id
            });

          }
          return true;
        },
        destructiveButtonClicked: function() {
          $scope.confirmDelete(priority);
          return true;
        }
      });


    }

    $scope.insert = function(title) {
      var query = "INSERT INTO prioritys (title) VALUES (?)";
      $cordovaSQLite.execute(db, query, [title]).then(function(res) {
        console.log("INSERT ID -> " + res.insertId);
      }, function(err) {
        console.error("ERROR: " + err);
      });
    }

    $scope.selectAll = function() {

      Priority.all().then(function(categories) {
        $scope.categories = categories;
      });

    }

    $scope.confirmDelete = function(priority) {
      $scope.selectedPriority = priority;
      $scope.openModal();
    }

    $scope.delete = function() {
      Priority.remove($scope.selectedPriority);
      $scope.selectAll();
      $scope.closeModal();
    }

    $ionicPlatform.ready(function() {

      Priority.all().then(function(categories) {
        $scope.categories = categories;
      });

      console.log(JSON.stringify($scope.categories));

      // $scope.selectAll();

    });

    $scope.$on('$ionicView.beforeEnter', function() {

      Priority.all().then(function(categories) {
        $scope.categories = categories;

        console.log(JSON.stringify($scope.categories));

      });

    });

  });
