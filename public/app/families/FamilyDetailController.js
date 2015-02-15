function FamilyDetailController($scope, $routeParams, FamilyResource) {

    $scope.formName = 'familyForm';
    $scope.documentName = 'family';
    $scope.documentResource = FamilyResource;

    $scope.familyStatuses = ['Family', 'Single', 'Unknown'];
    $scope.documentDefaults = function () {
        return {
            familyStatus: 'Family',
            dateAdded: new Date(),
            address2:'',
            city: 'Bowmanville',
            province: 'ON',
            postal:'L1L 9A9',
            phone1:'905-555-1234',
            phone2:'',
            totalMonthlyExpenses:1000,
            totalMonthlyIncome:1000,
            proofOfIncomeProvided: false,
            proofOfExpensesProvided: false,
            proofOfAddressProvided: false,
            registeredDate: new Date()
        };
    };

    BaseFormController.call(this, $scope, $routeParams);

    $scope.addContact = function() {
        if(!$scope.family.clients) {
            $scope.family.clients = [];
        }
        $scope.family.clients.push({ lastName:'', firstName:'', _id:'000000000000000000000000' });
    };

}
FamilyDetailController.prototype = Object.create(BaseFormController.prototype);

angular.module('app').controller('FamilyDetailController', FamilyDetailController);