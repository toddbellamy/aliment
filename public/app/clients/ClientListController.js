angular.module('app').controller('ClientListController', function($scope, ClientResource) {

    $scope.clients = ClientResource.query();

    $scope.sortOptions = [{value:"lastName",text: "Sort by Last Name"},
        {value: "firstName",text: "Sort by First Name"}];

    $scope.sortOrder = $scope.sortOptions[0].value;
});