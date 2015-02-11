function mvClientDetailController($scope, $routeParams, mvClient) {

    $scope.formName = 'clientForm';
    $scope.documentName = 'client';
    $scope.documentResource = mvClient;
    BaseFormController.call(this, $scope, $routeParams);

}
mvClientDetailController.prototype = Object.create(BaseFormController.prototype);

angular.module('app').controller('mvClientDetailController', mvClientDetailController);