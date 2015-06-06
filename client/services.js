angular.module('context.services', [])

.factory('Mail', function ($http, $location){


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

  var getMessagesForAccount = function(id) {
    var that = this;
    this.id = id;
    this.messageList = [];
    return $http({
      method: "GET",
      url: "api/messages/" + id
    })
    .then (function (messages){
      var messageObj = {};
      messages.data.results.forEach(function (message){
        var subject = message.subject;
        var from = message.addresses.from.email;
        if (!messageObj[from]) {
          messageObj[from] = {
            address: from,
            subjects: []
          };
        }
        messageObj[from].subjects.push(subject);
      })
      for (var key in messageObj) {
        that.messageList.push(messageObj[key]);
      }
      console.log('addresses', that.messageList)
      $location.path('/messages');
    })
  }

  var displayMessages = function ($scope) {
    $scope.messages = this.messageList;
  }

  var unsubscribe = function (addresses) {
    var id = this.id;
    return $http({
      method: 'POST',
      url: 'api/messages',
      data: {
        addresses: addresses,
        id: id
      }
    })
    .then (function() {
      bootbox.alert("Your messages have been deleted!");
      $location.path('/');
    });
  }

return {
  getAccounts: getAccounts,
  getMessagesForAccount: getMessagesForAccount,
  displayMessages: displayMessages,
  unsubscribe: unsubscribe
}

});