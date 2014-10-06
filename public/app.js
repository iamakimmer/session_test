'use strict';

angular
  .module('sessionApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider, $httpProvider) {   
    $httpProvider.defaults.withCredentials = true;     

    $routeProvider.
      when('/', {
        templateUrl: '/login.html',
        controller: 'LoginController'
      });   
  });


angular.module('sessionApp').controller('LoginController', function($scope, $http) {
  $scope.credentials = {
    email: 'matthewjkim@gmail.com',
    password: 'test1234'
  };


  $scope.login = function(credentials) {
    $http({
        url: 'http://localhost:3000/login',
        method: 'POST',
        withCredentials: false,
        data: credentials
      })
      .then(function(res) {
        //should have user by here, but we're going to call the api because the session should have this user now.
        //console.log('res', res.data);
        $http.get('http://localhost:3000/user').then(function(data) {
          console.log('data', data);
          $scope.user = data.data.user;
        }, function(data) {
          alert('could not get user.');
        });
      });
  }
});

// run blocks
angular.module('sessionApp').run([function() {
  console.log('started.');
}]);
