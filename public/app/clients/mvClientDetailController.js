angular.module('app').controller('mvClientDetailController', function($scope, $routeParams, mvClient) {

    var dataLoaded = function(data) {
        $scope.client = data[0];
        //convertDateStringsToDates($scope.client);
    };

    $scope.client = mvClient.query({id:$routeParams.id }).$promise.then(dataLoaded);

    $scope.save = function() {
      //mvClient.save($scope.client).$promise.then(
      $scope.client.$save().then(
          function(client) {
              //convertDateStringsToDates(client);
              console.log('client saved');
              $scope.clientForm.$setPristine();
          },
          function(reason) {
              var prob = reason;
          });
    };

    $scope.new = function() {
        $scope.client = new mvClient();
    }

    $scope.cancel = function() {
        $scope.client = mvClient.query({id:$scope.client._id}).$promise.then(dataLoaded);
        $scope.clientForm.$setPristine();
    };

    $scope.canSave = function () {
        return $scope.clientForm.$dirty && !$scope.clientForm.$invalid;
    };

    $scope.isDirty = function () {
        return $scope.clientForm.$dirty;
    };

});