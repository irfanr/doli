angular.module('doli.services', [])

.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;

  // Handle query's and potential errors
  self.query = function(query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function() {
      $cordovaSQLite.execute(db, query, parameters)
        .then(function(result) {
          q.resolve(result);
        }, function(error) {
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  return self;
})

.factory('Task', function($cordovaSQLite, DBA) {
  var self = this;

  self.all = function() {
    return DBA.query("SELECT id, title FROM tasks")
      .then(function(result) {
        return DBA.getAll(result);
      });
  }

  self.get = function(taskId) {
    var parameters = [taskId];
    return DBA.query("SELECT id, title FROM tasks WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  }

  self.add = function(task) {
    var parameters = [task.title];
    return DBA.query("INSERT INTO tasks (title) VALUES (?)", parameters);
  }

  self.remove = function(task) {
    var parameters = [task.id];
    return DBA.query("DELETE FROM tasks WHERE id = (?)", parameters);
  }

  self.update = function(oldTask, newTask) {
    var parameters = [newTask.name, oldTask.id];
    return DBA.query("UPDATE tasks SET title = (?) WHERE id = (?)", parameters);
  }

  return self;
})