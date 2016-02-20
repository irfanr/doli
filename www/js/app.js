// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var db = null;
// var MODE = "DEV";
var MODE = "PROD";

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
    .state('app.priority', {
      url: '/priority',
      views: {
        'menuContent': {
          controller: 'PriorityListController',
          templateUrl: 'views/priority/priority-list.view.html'
        }
      }
    }).state('app.priority-view', {
      url: '/priority/:priorityId',
      views: {
        'menuContent': {
          controller: 'PriorityViewController',
          templateUrl: 'views/priority/priority-view.view.html'
        }
      }
    }).state('app.priority-add', {
      url: '/priority-add',
      views: {
        'menuContent': {
          controller: 'PriorityAddController',
          templateUrl: 'views/priority/priority-add.view.html'
        }
      }
    }).state('app.priority-edit', {
      url: '/priority-edit/:priorityId',
      views: {
        'menuContent': {
          controller: 'PriorityEditCosntroller',
          templateUrl: 'views/priority/priority-edit.view.html'
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
    }).state('app.option', {
      url: '/option',
      views: {
        'menuContent': {
          controller: 'OptionListController',
          templateUrl: 'views/option/option-list.view.html'
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

      if (MODE == 'DEV') {
        window.plugins.sqlDB.remove("doli.db", 0, function() {

            window.plugins.sqlDB.copy("doli.db", 0, function() {
              db = $cordovaSQLite.openDB("doli.db");
            }, function(error) {
              console.error("There was an error copying the database: " + JSON.stringify(error));
              db = $cordovaSQLite.openDB("doli.db");
            });

          },
          function(error) {
            console.error("There was an error removing the database: " + JSON.stringify(error));

          });
      } else if (MODE == 'PROD') {
        db = $cordovaSQLite.openDB("doli.db");
      }


    }



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
