function BaseFormController($scope, $routeParams, Notifier) {

    //Note: $scope.formName, $scope.documentName, $scope.documentResource are assumed to exist.
    $scope.documentForm = null;
    $scope.document = null;

    $scope.$watch($scope[$scope.formName], function(newValue, oldValue) {
        if(!$scope.documentForm) { $scope.documentForm = $scope[$scope.formName]; }
    });

    $scope.$watch($scope[$scope.documentName], function(newValue, oldValue) {
        if(!$scope.document) { $scope.document = $scope[$scope.documentName]; }
    });

    var dataLoaded = function(data) {
        $scope[$scope.documentName] = $scope.document = data;
    };

    var createNewDocument = function() {
        $scope[$scope.documentName] = $scope.document = new $scope.documentResource(
            $scope.documentDefaults ? $scope.documentDefaults() : {}
        );
    };

    if($routeParams.id && $routeParams.id == "new") {
        createNewDocument();
    }
    else {
        $scope.documentResource.get({id: $routeParams.id}).$promise.then(dataLoaded);
    }

    $scope.documentId = function () {
        return ($scope.document && $scope.document._id ? $scope.document._id : '0' );
    };

    $scope.loadDocument = function() {
        $scope.documentResource.get({id:$scope.documentId()}).$promise.then(dataLoaded);
    };

    $scope.cancel = function() {
        $scope.loadDocument();
        $scope.documentForm.$setPristine();
    };

    $scope.canSave = function () {
        return $scope.documentForm.$dirty && !$scope.documentForm.$invalid;
    };

    $scope.isDirty = function () {
        return $scope.documentForm.$dirty;
    };

    $scope.canCancel = function() {
        return $scope.isNew() || $scope.isDirty();
    };

    $scope.isNew = function() {
        return (!$scope.document || !$scope.document._id);
    };

    $scope.save = function() {
        $scope.document.$save().then(
            function(doc) {
                $scope.documentForm.$setPristine();
                Notifier.notify('Saved successfully!');
            },
            function(reason) {
                console.log('Problem saving: ' + reason);
                Notifier.error('Problem saving: ' + reason);
            });
    };

    $scope.new = function() {
        createNewDocument();
    };

    $scope.provinceCodes = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];


}

