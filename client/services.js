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

  var getMessagesForAccount = function($scope, id) {
    var that = this;
    if (id) {
      this.id = id;
    } else {
      id = this.id;
    }
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
        messageObj[key].shown = false;
        that.messageList.push(messageObj[key]);
      }
      if ($location.path() !== '/messages') {
        $location.path('/messages');
      } else {
        $scope.messages = that.messageList;
      }
    })
  }

  var displayMessages = function ($scope) {
    $scope.messages = this.messageList;
  }

  var unsubscribe = function (addresses, $scope) {
    var id = this.id;
    var that = this;
     return $http({
      method: 'POST',
      url: 'api/messages',
      data: {
        addresses: addresses,
        id: id
      }
    })
    .then (function(response) {
      return;
    });
  }

return {
  getAccounts: getAccounts,
  getMessagesForAccount: getMessagesForAccount,
  displayMessages: displayMessages,
  unsubscribe: unsubscribe
}

});