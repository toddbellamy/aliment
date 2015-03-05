angular.module('app').controller('UserListController', function($scope, $location, User) {
  $scope.users = User.query();

    $scope.userRowClick = function(id) {
        $location.path("/admin/users/" + id);
    };
});