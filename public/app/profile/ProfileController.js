angular.module('app').controller('ProfileController', function($scope, Auth, Identity, Notifier) {
    $scope.username = Identity.currentUser.userName;
    $scope.fname = Identity.currentUser.firstName;
    $scope.lname = Identity.currentUser.lastName;
    $scope.password = null;
    $scope.verifyPassword = null;

    $scope.update = function() {

        if($scope.password != $scope.verifyPassword) {
            Notifier.error("Passwords do not match");
            return;
        }

        var userData = {
            userName: $scope.username,
            firstName: $scope.fname,
            lastName: $scope.lname
        }

        if($scope.password && $scope.password.length > 0) {
            userData.password = $scope.password;
        }

        Auth.updateCurrentUser(userData).then(function() {
            Notifier.notify('Your user account has been updated');
        }, function(reason) {
             Notifier.error(reason);
        });
    };

})