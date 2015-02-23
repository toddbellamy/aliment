angular.module('app').controller('FamilyListController', function($scope, $location, FamilyResource) {

    $scope.families = FamilyResource.query();

    $scope.sortOptions = [{value:"dateAdded",text: "Sort by Date Added"},
        {value: "phone1",text: "Sort by Phone Number"},
        {value: "address1",text: "Sort by Address"}];

    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.familyRowClick = function (id) {
        $location.path("/families/" + id);
    };

    $scope.pageTotalItems = 0;
    $scope.currentPage = 1;
    $scope.pageMaxSize = 8;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };
});