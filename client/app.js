'use strict';

angular.module('context', [
  'ngRoute',
  'context.test',
  'context.services'
  ])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './test.html',
      controller: 'testCtrl',
      authenticate: false
    })
    .otherwise({
      redirectTo: '/'
    })
}])








