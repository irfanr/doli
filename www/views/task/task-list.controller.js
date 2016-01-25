angular.module('doli')
  .controller('TaskListController', function($scope, $cordovaSQLite) {

    $scope.tasks = [{
      title: 'Task 1'
    }, {
      title: 'Task 2'
    }, {
      title: 'Task 3'
    }];

    $scope.insert = function(title) {
      var query = "INSERT INTO tasks (title) VALUES (?)";
      $cordovaSQLite.execute(db, query, [title]).then(function(res) {
        console.log("INSERT ID -> " + res.insertId);
      }, function(err) {
        console.error("ERROR: " + err);
      });
    }

    $scope.selectAll = function() {
      var query = "SELECT title FROM tasks";
      $cordovaSQLite.execute(db, query, []).then(function(res) {
        if (res.rows.length > 0) {
          console.log("SELECTED -> " + res.rows.item(0).title);

          $scope.tasks = [];
          for (var i = 0; i < res.rows.length; i++) {
            row = res.rows.item(i);
            console.log("row is " + JSON.stringify(row));
            $scope.tasks.push(row);
          }

        } else {
          console.log("No results found");
        }
      }, function(err) {
        console.error(err);
      });
    }

    $scope.insertDummy = function() {

      $scope.insert('Task A');
      $scope.insert('Task B');
      $scope.insert('Task C');

      $scope.selectAll();
    }



  });
