angular.module('app').controller('NavBarLoginController', function($scope, $http, Identity, Notifier, Auth, $location) {

    $scope.identity = Identity;
    $scope.username = "";
    $scope.password = "";

    $scope.signin = function() {
        Auth.authenticateUser($scope.username, $scope.password).then(function(success) {
            if(success) {
                $scope.password = "";
                Notifier.notify('You have successfully signed in!');
                Auth.forceLogin = false;
                //$('#mainnav-button').click();
                $location.path('/');

            } else {
                $scope.password = "";
                Notifier.error('Username/Password combination incorrect');
            }
            $scope.password = "";
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
    $scope.showModalLogin = function() {
        return Auth.forceLogin;
    };
});