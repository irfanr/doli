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
          console.warn(JSON.stringify(error));
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
    return DBA.query("SELECT t.id, t.title, c.id as category_id, c.icon as category_icon, c.color as category_color FROM tasks t, categories c WHERE t.category_id = c.id")
      .then(function(result) {
        return DBA.getAll(result);
      });
  }

  self.get = function(taskId) {
    var parameters = [taskId];
    return DBA.query("SELECT t.id, t.title, c.id as category_id, c.name as category_name, c.icon as category_icon, c.color as category_color FROM tasks t, categories c WHERE t.category_id = c.id AND t.id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  }

  self.add = function(task) {
    var parameters = [task.title, task.category_id];
    return DBA.query("INSERT INTO tasks (title, category_id) VALUES (?,?)", parameters);
  }

  self.remove = function(task) {
    var parameters = [task.id];
    return DBA.query("DELETE FROM tasks WHERE id = (?)", parameters);
  }

  self.update = function(oldTask, newTask) {
    var parameters = [newTask.title, newTask.category_id, oldTask.id];
    return DBA.query("UPDATE tasks SET title = (?),category_id = (?) WHERE id = (?)", parameters);
  }

  return self;
})

.factory('Category', function($cordovaSQLite, DBA) {
  var self = this;

  self.all = function() {
    return DBA.query("SELECT id, code, color, icon, name FROM categories")
      .then(function(result) {
        return DBA.getAll(result);
      });
  }

  self.get = function(categoryId) {
    var parameters = [categoryId];
    return DBA.query("SELECT id, code, color, icon, name FROM categories WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  }

  self.add = function(category) {
    var parameters = [category.code, category.color, category.icon, category.name];
    return DBA.query("INSERT INTO categories (code, color, icon, name) VALUES (?,?,?,?)", parameters);
  }

  self.remove = function(category) {
    var parameters = [category.id];
    return DBA.query("DELETE FROM categories WHERE id = (?)", parameters);
  }

  self.update = function(oldCategory, newCategory) {
    var parameters = [newCategory.code, newCategory.color, newCategory.icon, newCategory.name, oldCategory.id];
    return DBA.query("UPDATE categories SET code = (?),color = (?),icon = (?), name = (?) WHERE id = (?)", parameters);
  }

  return self;
})
