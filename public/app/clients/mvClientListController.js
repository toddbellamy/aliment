angular.module('app').controller('mvClientListController', function($scope, mvClient) {

    $scope.clients = mvClient.query();

    $scope.sortOptions = [{value:"lastName",text: "Sort by Last Name"},
        {value: "firstName",text: "Sort by First Name"}];

    $scope.sortOrder = $scope.sortOptions[0].value;
});