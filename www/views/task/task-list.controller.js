angular.module('doli')
  .controller('TaskListController', function($scope, $state, $ionicPlatform, $cordovaSQLite, Task, $ionicModal, $ionicActionSheet) {

    $scope.selectedTask = {};

    $ionicModal.fromTemplateUrl('task-delete-confirm.html', {
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

    $scope.tasks = [];

    $scope.onHold = function(task) {

      $ionicActionSheet.show({
        titleText: task.title,
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
          return true;
        },
        destructiveButtonClicked: function() {
          $scope.confirmDelete(task);
          return true;
        }
      });


    }

    $scope.insert = function(title) {
      var query = "INSERT INTO tasks (title) VALUES (?)";
      $cordovaSQLite.execute(db, query, [title]).then(function(res) {
        console.log("INSERT ID -> " + res.insertId);
      }, function(err) {
        console.error("ERROR: " + err);
      });
    }

    $scope.selectAll = function() {

      Task.all().then(function(tasks) {
        $scope.tasks = tasks;
      });

    }

    $scope.insertDummy = function() {

      $scope.insert('Task A');
      $scope.insert('Task B');
      $scope.insert('Task C');

      $scope.selectAll();
    }

    $scope.confirmDelete = function(task) {
      $scope.selectedTask = task;
      $scope.openModal();
    }

    $scope.delete = function() {
      Task.remove($scope.selectedTask);
      $scope.selectAll();
      $scope.closeModal();
    }

    $ionicPlatform.ready(function() {

      Task.all().then(function(tasks) {
        $scope.tasks = tasks;
      });

      // $scope.selectAll();

    });

    $scope.$on('$ionicView.beforeEnter', function() {

      Task.all().then(function(tasks) {
        $scope.tasks = tasks;
      });

    });

  });
