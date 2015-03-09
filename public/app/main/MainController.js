angular.module('app').controller('MainController', function($scope, Identity) {

    $scope.$on('$viewContentLoaded', function(){
        if(!Identity.currentUser) {
            $('#userName').focus();
        }
    });

});