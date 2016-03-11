angular.module('doli')
  .controller('TaskListController', function($scope, $rootScope, $state, $ionicPlatform, $cordovaSQLite, Task, $ionicModal, $ionicActionSheet, Category) {

    $scope.selectedTask = {};

    $rootScope.options = {
      doneTaskVisible: false,
      selectedCategory: 'ALL'
    };

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
          if (index === 0) {

            $state.transitionTo('app.task-edit', {
              taskId: task.id
            });

          }
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

      if ($rootScope.options.selectedCategory == 'ALL') {

        Task.all(1).then(function(tasks) {
          $scope.tasks = tasks;

          angular.forEach($scope.tasks, function(task) {
            // console.log(JSON.stringify(task));
          });

        });

        if ($rootScope.options.doneTaskVisible) {
          Task.all(2).then(function(tasksDone) {
            $scope.tasksDone = tasksDone;
          });
        } else {
          $scope.tasksDone = [];
        }

      } else {

        var categoryId = $rootScope.options.selectedCategory * 1;

        Task.findByCategory(1, categoryId).then(function(tasks) {
          $scope.tasks = tasks;
        });

        if ($rootScope.options.doneTaskVisible) {
          Task.findByCategory(2, categoryId).then(function(tasksDone) {
            $scope.tasksDone = tasksDone;
          });
        } else {
          $scope.tasksDone = [];
        }

      }

    }

    $scope.selectCategory = function(selectedCategory) {

      $rootScope.options.selectedCategory = selectedCategory;

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

    $scope.done = function(task) {
      Task.done(task);
      $scope.selectAll();
    }

    $scope.undone = function(task) {
      Task.undone(task);
      $scope.selectAll();
    }

    $scope.promote = function(task) {

      console.log(JSON.stringify(task));

      if (task.priority_id > 1) {
        task.priority_id = task.priority_id - 1;
        Task.changePriority(task);
        $scope.selectAll();
      }
    }

    $scope.demote = function(task) {

      console.log(JSON.stringify(task));

      if (task.priority_id < 4) {
        task.priority_id = task.priority_id + 1;
        Task.changePriority(task);
        $scope.selectAll();
      }
    }

    $ionicPlatform.ready(function() {

      console.log('Task Load All in $ionicPlatform.ready');

      $scope.selectAll();

    });

    $scope.$on('$ionicView.beforeEnter', function() {

      console.log('Task Load All in $ionicView.beforeEnter');

      $scope.selectAll();

    });

    $scope.$on('$ionicView.enter', function() {

      console.log('Task Load All in $ionicView.enter');

      if ($scope.tasks.length != 0) {

        $scope.selectAll();

      }

    });

    $scope.$on('doneTaskVisibleChanged', function(event, args) {

      console.log('on doneTaskVisibleChanged');

      $scope.selectAll();


    });

    Category.all().then(function(categories) {
      $scope.categories = categories;
    });

  });
