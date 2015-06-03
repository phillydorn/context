angular.module('context.messages', [])

.controller('messageCtrl', function ($scope, Mail) {

  $scope.init = function() {
    Mail.displayMessages($scope);
  }();

});