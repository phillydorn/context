angular.module('context.services', [])

.factory('Mail', function ($http, $location){

  var messageList =[];

  var getAccounts = function($scope) {
    return $http({
      method: "GET",
      url: '/api/accounts'
    })
    .then (function(accounts) {
      $scope.accounts = accounts.data.map(function(account) {
        return {address: account.email_addresses[0], id: account.id};
      });
    })
  }

  var getMessages = function(id) {
    var that = this;
    return $http({
      method: "GET",
      url: "api/messages/" + id
    })
    .then (function (messages){
      var obj = {};
      messages.data.results.forEach(function (message){
        console.log(message)
        var from = message.addresses.from.email;
        if (!obj[from]) {
          obj[from] = true;
        }
      })
      that.messageList = Object.keys(obj);
      $location.path('/messages');
    })
  }

  var displayMessages = function ($scope) {
    $scope.messages = this.messageList;
  }

return {
  getAccounts: getAccounts,
  getMessages: getMessages,
  displayMessages: displayMessages
}

});