angular.module('app').controller('ClientListController', function($scope, $location, ClientResource, TableHelper) {

    $scope.clients = [];
    $scope.tableDataLoading = false;

    $scope.loadClients = function() {
        var clientTable$ = $('table.table');
        TableHelper.freezeColWidths(clientTable$, true);

        $scope.tableDataLoading = true;
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
                $scope.tableDataLoading = false;
                TableHelper.freezeColWidths(clientTable$, false)
            });
    };


    $scope.$watch('searchText', function() {
        $scope.currentPage = 1;
        $scope.loadClients();
    });

    $scope.$watch('sortOrder', function() {
        $scope.currentPage = 1;
        $scope.loadClients();
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

    $scope.loadClients();

});