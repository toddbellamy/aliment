/**
 * Created by todd on 15-02-11.
 */
function FamilyDetailController($scope, $routeParams, FamilyResource) {

    $scope.formName = 'familyForm';
    $scope.documentName = 'family';
    $scope.documentResource = FamilyResource;

    $scope.familyStatuses = ['Family', 'Single', 'Unknown'];
    $scope.documentDefaults = function () {
        return {
            familyStatus: 'Family',
            dateAdded: new Date(),
            city: 'Bowmanville',
            province: 'ON',
            proofOfIncomeProvided: false,
            proofOfExpensesProvided: false,
            proofOfAddressProvided: false,
            registeredDate: new Date()
        };
    };

    BaseFormController.call(this, $scope, $routeParams);
}
FamilyDetailController.prototype = Object.create(BaseFormController.prototype);

angular.module('app').controller('FamilyDetailController', FamilyDetailController);