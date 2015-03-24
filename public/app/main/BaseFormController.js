function BaseFormController($scope, $routeParams, Notifier, Identity) {

    //Note: $scope.formName, $scope.documentName, $scope.documentResource are assumed to exist.
    $scope.documentForm = null;
    $scope.document = null;

    $scope.$watch($scope[$scope.formName], function(newValue, oldValue) {
        if(!$scope.documentForm) {
            $scope.documentForm = $scope[$scope.formName];
        }
    });

    $scope.$watch($scope[$scope.documentName], function(newValue, oldValue) {
        if(!$scope.document) {
            $scope.document = $scope[$scope.documentName];
        }
    });

    var dataLoaded = function(data) {
        $scope[$scope.documentName] = $scope.document = data;
    };

    var createNewDocument = function() {
        $scope[$scope.documentName] = $scope.document = new $scope.documentResource(
            $scope.documentDefaults ? $scope.documentDefaults() : {}
        );
    };

    $scope.documentId = function () {
        return ($scope.document && $scope.document._id ? $scope.document._id : '0' );
    };

    $scope.loadDocument = function() {
        var p = $scope.documentResource.get({id:$scope.documentId()}).$promise.then(dataLoaded);
        return p;
    };

    $scope.loadInitialDoc = function() {
        if($routeParams.id && $routeParams.id == "new") {
            createNewDocument();
        }
        else if ($routeParams.id) {
            $scope.documentResource.get({id: $routeParams.id}).$promise.then(dataLoaded);
        }
        else {
            $scope.documentResource.get({id: 0}).$promise.then(dataLoaded);
        }
    };

    $scope.cancel = function() {
        $scope.loadDocument();
        $scope.documentForm.$setPristine();
    };

    $scope.canSave = function () {
        return $scope.documentForm.$dirty;
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
        if($scope.documentForm.$invalid) {
            Notifier.error("Please complete form.");
            // If form is not valid, visit each control to show validation errors...
            var $inputs = $('input.form-control, select.form-control');
            $inputs.each(function() {
               $(this).focus();
            });
            return;
        }

        if(!Identity.isAuthorized('admin', 'staff')) {
            Notifier.error('Not authorized to save data');
            return;
        }

        $scope.document.$save().then(
            function(doc) {
                $scope.documentForm.$setPristine();
                Notifier.notify('Saved successfully!');
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
                console.log('Problem saving ' + reason);
                if(reason) {
                    Notifier.error('Problem saving: ' + reason);
                }
                else {
                    Notifier.error('A problem has has occurred while saving.');
                }
            });
    };

    $scope.new = function() {
        createNewDocument();
    };

    $scope.setDirty = function() {
        $scope.documentForm.$dirty = true;
    }

    $scope.provinceCodes = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

    $scope.loadInitialDoc();
}

BaseFormController.prototype = checkRegistrationStatus = function(family, notifier) {
    if(!family) {
        return;
    }
    var milliDay = 86400000; // milliseconds in a day.
    var sinceLastReg = Date.now() - family.registeredDate.getTime();
    var daysSince = (sinceLastReg / milliDay);
    if(daysSince >= 90) {
        notifier.alert("Time to re-register family!");
    }
};

