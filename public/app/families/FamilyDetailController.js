function FamilyDetailController($scope, $routeParams, FamilyResource, Notifier, Identity) {

    $scope.formName = 'familyForm';
    $scope.documentName = 'family';
    $scope.documentResource = FamilyResource;

    $scope.familyStatuses = ['Family', 'Single', 'Unknown'];
    $scope.documentDefaults = function () {
        return {
            familyStatus: 'Family',
            dateAdded: new Date(),
            address1:'',
            address2:'',
            city: 'Bowmanville',
            province: 'ON',
            phone1:'',
            phone2:'',
            postal:'',
            totalMonthlyExpenses:0,
            totalMonthlyIncome:0,
            proofOfIncomeProvided: false,
            proofOfExpensesProvided: false,
            proofOfAddressProvided: false,
            registeredDate: new Date()
        };
    };

    $scope.addContact = function() {
        checkRegistrationStatus($scope.family, Notifier);

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

        $scope.family.clients.push({ lastName:($scope.family.primaryClient ? $scope.family.primaryClient.lastName : ''), firstName:'', _id:'000000000000000000000000' });
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

    $scope.registerFamily = function() {
        if($scope.family) {
            $scope.family.registeredDate = new Date();
            $scope.setDirty();
        }
    };

    BaseFormController.call(this, $scope, $routeParams, Notifier, Identity);
}
FamilyDetailController.prototype = Object.create(BaseFormController.prototype);

angular.module('app').controller('FamilyDetailController', FamilyDetailController);