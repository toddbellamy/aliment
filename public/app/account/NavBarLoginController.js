angular.module('app').controller('NavBarLoginController', function($scope, $http, Identity, Notifier, Auth, $location) {
  $scope.identity = Identity;
  $scope.signin = function(username, password) {
    Auth.authenticateUser(username, password).then(function(success) {
      if(success) {
        Notifier.notify('You have successfully signed in!');
        $('#mainnav-button').click();

      } else {
        Notifier.error('Username/Password combination incorrect');
      }
    });
  }

  $scope.signout = function() {
    Auth.logoutUser().then(function() {
      $scope.userame = "";
      $scope.password = "";
      Notifier.notify('You have successfully signed out!');
      $location.path('/');

    })
  }
});