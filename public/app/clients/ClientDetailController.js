function ClientDetailController($scope, $routeParams, ClientResource) {

    $scope.formName = 'clientForm';
    $scope.documentName = 'client';
    $scope.documentResource = ClientResource;
    BaseFormController.call(this, $scope, $routeParams);

}
ClientDetailController.prototype = Object.create(BaseFormController.prototype);

angular.module('app').controller('ClientDetailController', ClientDetailController);