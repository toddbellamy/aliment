angular.module('app').controller('MainController', function($scope, Identity, Auth) {

    $scope.$on('$viewContentLoaded', function(){
        if(!Identity.currentUser) {
            $('#userName').focus();
        }
    });

    $scope.showModalLogin = function () {
      return Auth.forceLogin;
    };
});