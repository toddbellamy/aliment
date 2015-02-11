angular.module('app').controller('FamilyListController', function($scope, FamilyResource) {

    $scope.families = FamilyResource.query();

    $scope.sortOptions = [{value:"dateAdded",text: "Sort by Date Added"},
        {value: "phone1",text: "Sort by Phone Number"},
        {value: "address1",text: "Sort by Address"}];

    $scope.sortOrder = $scope.sortOptions[0].value;
});