function ClientDetailController($scope, $routeParams, ClientResource, Notifier, Identity) {

    $scope.formName = 'clientForm';
    $scope.documentName = 'client';
    $scope.documentResource = ClientResource;
    BaseFormController.call(this, $scope, $routeParams, Notifier, Identity);

}
ClientDetailController.prototype = Object.create(BaseFormController.prototype);

angular.module('app').controller('ClientDetailController', ClientDetailController);