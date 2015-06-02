angular.module('context.services', [])

.factory('Mail', function ($http){

  var getMail = function($scope) {
    return $http({
      method: "GET",
      url: '/api/mail'
    })
    .then (function(mail) {
      console.log(mail);
    })
  }

return {
  getMail: getMail
}

});