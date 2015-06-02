angular.module('context.test', [])

.controller('testCtrl', function ($scope, Mail) {

$scope.init = function() {
  Mail.getMail();
}();

});