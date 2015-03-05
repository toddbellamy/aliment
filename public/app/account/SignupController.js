angular.module('app').controller('SignupController', function($scope, mvUser, Notifier, $location, Auth) {

  $scope.signup = function() {
    var newUserData = {
      userName: $scope.email,
      password: $scope.password,
      firstName: $scope.fname,
      lastName: $scope.lname
    };

    Auth.createUser(newUserData).then(function() {
      Notifier.notify('User account created!');
      $location.path('/');
    }, function(reason) {
      Notifier.error(reason);
    })
  }
})