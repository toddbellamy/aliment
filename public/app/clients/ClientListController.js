angular.module('app').controller('ClientListController', function($scope, $location, ClientResource) {

    $scope.clients = [];

    var loadClients = function() {

        $scope.clients = ClientResource.query({
                page:$scope.currentPage,
                size:$scope.itemsPerPage,
                filter:$scope.searchText,
                sort:$scope.sortOrder
            },
            function(data, getHeaders) {
                var headers = getHeaders();
                if(headers.totalrowcount != $scope.pageTotalItems) {
                    $scope.pageTotalItems = headers.totalrowcount;
                }
            });
    };

    $scope.$watch('searchText', function() {
        $scope.currentPage = 1;
        loadClients();
    });

    $scope.$watch('sortOrder', function() {
        $scope.currentPage = 1;
        loadClients();
    });


    $scope.sortOptions = [{value:"name",text: "Sort by Name"}, {value:"dateOfBirth",text: "Sort by Date of Birth"}];

    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.clientRowClick = function(id) {
        $location.path("/clients/" + id);
    };

    $scope.itemsPerPage = 12;
    $scope.pageTotalItems = 1;
    $scope.currentPage = 1;
    $scope.pageMaxSize = 10;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;

    };

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
        loadClients();
    };

    loadClients();

});