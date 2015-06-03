'use strict';

angular.module('context', [
  'ngRoute',
  'context.accounts',
  'context.services',
  'context.messages'
  ])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './accounts.html',
      controller: 'accountCtrl'
    })
    .when('/messages', {
      templateUrl: './messages.html',
      controller: 'messageCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })
}])








