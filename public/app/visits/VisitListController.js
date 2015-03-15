

function VisitListController($scope, $routeParams, VisitResource, Notifier, Identity, User) {

    $scope.formName = 'familyVisitsForm';
    $scope.documentName = 'family';
    $scope.documentResource = VisitResource;
    BaseFormController.call(this, $scope, $routeParams, Notifier, Identity);

    $scope.sortOptions = [{value:"date",text: "Sort by Date"}, { value: "client",text: "Sort by Client" }];
    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.users = User.query(function() {
            $scope.staffNames = (function () {
                var staff =
                    $scope.users.filter(function (user) {
                        return (user.roles.indexOf('staff') >= 0 || user.roles.indexOf('admin') >= 0);
                    });
                return staff.map(function (user) {
                    return user.firstName;
                });
            })();
        });

    $scope.addVisit = function() {

        checkRegistrationStatus($scope.family, Notifier);

        if($scope.sortOrder != 'date') {
            $scope.sortOrder = 'date';
        }

        if(!$scope.family.visits) {
            $scope.family.visits = [];
        }

        if($scope.family.visits.length > 0) {
            if(!$scope.family.visits[$scope.family.visits.length - 1].date ||
                !$scope.family.visits[$scope.family.visits.length - 1].client ||
                !$scope.family.visits[$scope.family.visits.length - 1].verification) {
                return;
            }
        }

        $scope.family.visits.push({
            client:$scope.family.primaryClient,
            date:new Date(),
            value:0.00,
            storeVoucher:'',
            reusableBagGiven:false,
            comments:'',
            verification: Identity.currentUser.firstName,
            foodVoucher:'',
            approvedBy:'',
            _id:'000000000000000000000000'
        });

    };

    $scope.removeVisit = function(visit) {
        if($scope.family.visits && $scope.family.visits.length > 0) {
            var index = $scope.family.visits.indexOf(visit);
            $scope.family.visits.splice(index, 1);
        }
    };

    $scope.reverseOrder = function() {
        return ($scope.sortOrder === 'date');
    };

    $scope.saveVisits = function() {
        checkRegistrationStatus($scope.family, Notifier);
        $scope.save();
    }


    $scope.pageSize = 5;
    $scope.currentPage = 1;
    $scope.visitPages = function () {
        var pages = [];
        if($scope.family && $scope.family.visits) {
            for(var i=0; i < ($scope.family.visits.length / $scope.pageSize); i++) {
                pages.push(i + 1);
            };
        }
        return pages;
    };
    $scope.setPage = function (page) {
        $scope.currentPage = page;
    };
    $scope.lastPage = function() {
      $scope.currentPage = ($scope.family.visits.length / $scope.pageSize);
    };
    $scope.firstPage = function() {
        $scope.currentPage = 1;
    };

}
VisitListController.prototype = Object.create(BaseFormController.prototype);
angular.module('app').controller('VisitListController', VisitListController);