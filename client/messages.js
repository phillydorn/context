angular.module('context.messages', [])

.controller('messageCtrl', function ($scope, Mail) {

  $scope.selectedAddresses = [];

  $scope.init = function() {
    Mail.displayMessages($scope);
  }();

  $scope.selectAddress = function(address) {
    $scope.selectedAddresses.push(address)
  }

  $scope.filterMessages = function() {
    var addressString = $scope.selectedAddresses.reduce(function (prev, curr) {
      return prev + '<br>' + curr;
    },'');
    console.log('addressString',$scope.selectedAddresses)
    bootbox.confirm("Are you sure you want to delete all messages from:"+ addressString, function (result) {
      if (result){
        Mail.unsubscribe($scope.selectedAddresses);
      }
    })
  }
})

.directive('toggleClass', function() {
  return {
      restrict: 'A',
      link: function(scope, element, attrs) {
          element.bind('click', function() {
              element.toggleClass(attrs.toggleClass);
          });
      }
  };
});


