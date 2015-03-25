angular.module('app').controller('MainController', function($scope, Identity, Auth, Notifier) {

    $scope.$on('$viewContentLoaded', function(){
        if(!Identity.currentUser) {
            $('#userName').focus();
        }
    });

    $scope.showModalLogin = function () {
      return Auth.forceLogin;
    };

    //$scope.demoModeMessage = (window.alimentDemoMode ? "(demo mode)" : "");
    if(window.alimentDemoMode) {
        Notifier.alert("Running in demo mode.  All data is fictional.  Any similarity to actual people is coincidental.")
    }
});