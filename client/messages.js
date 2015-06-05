angular.module('context.messages', [])

.controller('messageCtrl', function ($scope, Mail) {

  $scope.selectedAddresses = [];

  $scope.init = function() {
    Mail.displayMessages($scope);
  }();

  $scope.selectAddress = function(address) {
    $scope.selectedAddresses.push(address)
    console.log($scope.selectedAddresses)
  }

  $scope.filterMessages = function() {
    bootbox.confirm("Are you sure you want to delete all messages?", function (result) {
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


