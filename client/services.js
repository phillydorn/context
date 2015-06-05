angular.module('context.services', [])

.factory('Mail', function ($http, $location){

  var addressList =[];
  var id;

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
    this.id = id;
    return $http({
      method: "GET",
      url: "api/messages/" + id
    })
    .then (function (messages){
      var obj = {};
      messages.data.results.forEach(function (message){
        var from = message.addresses.from.email;
        if (!obj[from]) {
          obj[from] = true;
        }

      })
      that.addressList = Object.keys(obj);
      $location.path('/messages');
    })
  }

  var displayMessages = function ($scope) {
    $scope.addresses = this.addressList;
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
  getMessages: getMessages,
  displayMessages: displayMessages,
  unsubscribe: unsubscribe
}

});