angular.module('context.accounts', [])

.controller('accountCtrl', function ($scope, Mail) {

  $scope.init = function() {
    Mail.getAccounts($scope);
  }();

  $scope.fetchMessages = function(account){
    Mail.getMessagesForAccount(account.id);
  }
});