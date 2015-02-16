'use strict';

// Declare app level module which depends on views, and components.
// the module name in this case is myApp, that depends on a list of additional dependencies.
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
// 
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
