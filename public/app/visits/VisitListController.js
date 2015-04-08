
function VisitListController($scope, $http, $compile, $routeParams, VisitResource, Notifier, Identity, User, Auth) {

    $scope.formName = 'familyVisitsForm';
    $scope.documentName = 'family';
    $scope.documentResource = VisitResource;
    BaseFormController.call(this, $scope, $routeParams, Notifier, Identity);

    $scope.sortOptions = [{value:"date",text: "Sort by Date"}, { value: "client",text: "Sort by Client" }];
    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.users = User.query(function() {
            $scope.staff = (function () {
                var staff =
                    $scope.users.filter(function (user) {
                        return (user.roles.indexOf('staff') >= 0 || user.roles.indexOf('admin') >= 0);
                    });
                return staff.map(function (user) {
                    return user;
                });
            })();
        });

    $scope.editingVisit = null;

    $scope.dialogContent = null;
    $scope.fetchDialogContent = function() {
        $http.get('/partials/visits/visit-dialog').then(function(result){
            $scope.dialogContent = result.data;
        });
    }

    $scope.fetchDialogContent();

    function displayVisitDialog() {
        $('#editVisitDialog').remove();

        var dialogElement = angular.element($scope.dialogContent);
        angular.element(document.body).prepend(dialogElement);
        $compile(dialogElement)($scope);

        $('#editVisitDialog').modal('show');
    }

    $scope.showAddVisit = function() {

        $scope.editingVisit = createNewVisit();
        displayVisitDialog();
    };

    function createNewVisit() {

        if(!$scope.family.visits) {
            $scope.family.visits = [];
        }

        return {
            client:$scope.family.primaryClient,
            date:new Date(),
            value:0.00,
            storeVoucher:'',
            reusableBagGiven:false,
            comments:'',
            verification: Identity.currentUser,
            foodVoucher:'',
            _id:'000000000000000000000000'
        };
    }

    $scope.editVisit = function(visit) {
        $scope.editingVisit = visit;
        displayVisitDialog();
    };


    $scope.editVisitDialog$ = null;

    $scope.submitVisit = function () {
        if($scope.editVisitForm.$invalid) {
            Notifier.error("Please complete form.");
            // If form is not valid, visit each control to show validation errors...
            var $inputs = $('input.form-control, select.form-control');
            $inputs.each(function() {
                $(this).focus();
            });
            return;
        }

        if($scope.editingVisit._id != 0) {
            if(!$scope.editingVisit.approvedBy) {
                Notifier.error("Approved By is required for change.");
                return;
            }
            else {
                if(!$scope.approvedByPassword) {
                    Notifier.error("Approved By Password is required.");
                    return;
                }
                else {
                    Auth.authenticateUser($scope.editingVisit.approvedBy.userName, $scope.approvedByPassword).then(function (success) {
                        if (success) {
                            saveVisit();

                        } else {
                            $scope.approvedByPassword = "";
                            Notifier.error('Approved By Password incorrect');
                        }
                        $scope.approvedByPassword = "";
                    });
                }
            }
        }
        else {
            saveVisit();
        }

    };

    function saveVisit() {
        var addToFamily = ($scope.editingVisit._id == 0);

        if(addToFamily) {
            $scope.family.visits.push($scope.editingVisit);
        }

        $scope.document.$save().then(
            function(doc) {
                $scope.editVisitForm.$setPristine();
                $('#editVisitDialog').modal('hide');
                Notifier.notify('Saved successfully!');
                checkRegistrationStatus($scope.family, Notifier);

            },
            function(error) {
                var reason = error;
                if(typeof error == 'object') {
                    if(error.data && error.data.reason) {
                        reason = error.data.reason;
                    }
                    else if (error.status == 403) {
                        reason = "Not authorized";
                    }
                    else {
                        reason = '';
                    }
                }
                console.log('Problem saving: ' + reason);

                if(reason) {
                    Notifier.error('Problem saving: ' + reason);
                }
                else {
                    Notifier.error('A problem has has occurred while saving.');
                }
            });
    }

    $scope.cancelEdit = function() {

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