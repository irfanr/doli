// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var db = null;

angular.module('doli', ['ionic', 'ngCordova', 'doli.services'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'views/menu/menu.view.html',
      controller: 'MenuController'
    })
    .state('app.category', {
      url: '/category',
      views: {
        'menuContent': {
          controller: 'CategoryListController',
          templateUrl: 'views/category/category-list.view.html'
        }
      }
    }).state('app.category-view', {
      url: '/category/:categoryId',
      views: {
        'menuContent': {
          controller: 'CategoryViewController',
          templateUrl: 'views/category/category-view.view.html'
        }
      }
    }).state('app.category-add', {
      url: '/category-add',
      views: {
        'menuContent': {
          controller: 'CategoryAddController',
          templateUrl: 'views/category/category-add.view.html'
        }
      }
    }).state('app.category-edit', {
      url: '/category-edit/:categoryId',
      views: {
        'menuContent': {
          controller: 'CategoryEditController',
          templateUrl: 'views/category/category-edit.view.html'
        }
      }
    })
    .state('app.task', {
      url: '/task',
      views: {
        'menuContent': {
          controller: 'TaskListController',
          templateUrl: 'views/task/task-list.view.html'
        }
      }
    }).state('app.task-view', {
      url: '/task/:taskId',
      views: {
        'menuContent': {
          controller: 'TaskViewController',
          templateUrl: 'views/task/task-view.view.html'
        }
      }
    }).state('app.task-add', {
      url: '/task-add',
      views: {
        'menuContent': {
          controller: 'TaskAddController',
          templateUrl: 'views/task/task-add.view.html'
        }
      }
    }).state('app.task-edit', {
      url: '/task-edit/:taskId',
      views: {
        'menuContent': {
          controller: 'TaskEditController',
          templateUrl: 'views/task/task-edit.view.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/app/task');

})

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    if (window.cordova) {
      db = $cordovaSQLite.openDB("doli.db");
    } else {
      // Ionic serve syntax
      db = window.openDatabase("myapp.db", "1.0", "My app", -1);
    }

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS tasks (id integer primary key, title text)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS categories (id integer primary key, name text)");

  });
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
