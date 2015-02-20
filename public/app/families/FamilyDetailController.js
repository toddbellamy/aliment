function FamilyDetailController($scope, $routeParams, FamilyResource, Notifier) {

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
            phone2:'',
            totalMonthlyExpenses:1000,
            totalMonthlyIncome:1000,
            proofOfIncomeProvided: false,
            proofOfExpensesProvided: false,
            proofOfAddressProvided: false,
            registeredDate: new Date()
        };
    };

    BaseFormController.call(this, $scope, $routeParams, Notifier);

    $scope.addContact = function() {
        if(!$scope.family.clients) {
            $scope.family.clients = [];
        }

        if(!$scope.showContacts) {
            $scope.toggleContacts();
        }

        if($scope.family.clients.length > 0) {
            if(!$scope.family.clients[$scope.family.clients.length - 1].lastName ||
                !$scope.family.clients[$scope.family.clients.length - 1].firstName ||
                !$scope.family.clients[$scope.family.clients.length - 1].dateOfBirth) {
                return;
            }
        }

        $scope.family.clients.push({ lastName:'', firstName:'', _id:'000000000000000000000000' });
    };

    $scope.removeContact = function(client) {
      if($scope.family.clients && $scope.family.clients.length > 0) {
          var index = $scope.family.clients.indexOf(client)
          $scope.family.clients.splice(index, 1);
      }
    };

    $scope.showContacts = false;
    $scope.showContactsTriangle = "glyphicon-triangle-right";
    $scope.toggleContacts = function() {
        $scope.showContacts = !$scope.showContacts;
        $scope.showContactsTriangle = ($scope.showContacts ? "glyphicon-triangle-bottom" : "glyphicon-triangle-right");
    };


}
FamilyDetailController.prototype = Object.create(BaseFormController.prototype);

angular.module('app').controller('FamilyDetailController', FamilyDetailController);