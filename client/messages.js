angular.module('context.messages', [])

.controller('messageCtrl', function ($scope, Mail) {

  $scope.selectedAddresses = [];

  $scope.init = function() {
    Mail.displayMessages($scope);
  }();

  $scope.selectAddress = function(checkAddress) {
    var selected = false;
    var newAddresses = [];
    $scope.selectedAddresses.forEach(function (address) {
      if (address !== checkAddress) {
        newAddresses.push(address);
      } else {
        selected = true;
      }
    })
    $scope.selectedAddresses = newAddresses;
    if (!selected) {
      $scope.selectedAddresses.push(checkAddress)
    }
  }

  $scope.filterMessages = function() {
    var addressString = $scope.selectedAddresses.reduce(function (prev, curr) {
      return prev + '<br>' + curr;
    },'');
    bootbox.confirm("Are you sure you want to delete all messages from:"+ addressString, function (result) {
      if (result){
        Mail.unsubscribe($scope.selectedAddresses, $scope);
        $scope.messages = $scope.messages.filter(function (message) {
          var notSelected = true;
          $scope.selectedAddresses.forEach(function (selected) {
            if (message.address === selected) {
              notSelected = false;
            }
          });
          return notSelected;
        });
      }
    })
  }
});


