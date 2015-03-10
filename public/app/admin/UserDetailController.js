angular.module('app').controller('UserDetailController', function($scope, $routeParams, Auth, User, Notifier) {

    $scope.verifyPassword = null;
    $scope.roles = ['admin', 'staff', 'guest'];

    if($routeParams.id && $routeParams.id == "new") {
        $scope.user = new User();
    }
    else if($routeParams.id) {
        User.get({ id: $routeParams.id} )
            .$promise.then(function(data) {
                $scope.user = data;
                $scope.user.password = null;
            });
    }

    $scope.$watch('user.userName', function() {
        if($scope.user && !$scope.user._id && $routeParams.id == "new") {
            $scope.user.password = $scope.verifyPassword = $scope.user.userName;
        }
    });

    $scope.update = function() {
        if($scope.user.password != $scope.verifyPassword) {
            Notifier.error("Passwords do not match");
            return;
        }

        var userData = {
            _id: $scope.user._id,
            userName: $scope.user.userName,
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName
        }

        if($scope.user.password && $scope.user.password.length > 0) {
            userData.password = $scope.user.password;
        }

        if(!$scope.user._id) {
            Auth.createUser($scope.user).then(function () {
                Notifier.notify('User account created!');

            }, function (reason) {
                Notifier.error(reason);
            });
        }
        else {
            Auth.updateUser($scope.user).then(function () {
                Notifier.notify('User account has been updated');
            }, function (reason) {
                Notifier.error(reason);
            });
        }
    }
})