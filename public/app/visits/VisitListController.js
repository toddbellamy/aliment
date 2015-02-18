

function VisitListController($scope, $routeParams, VisitResource) {

    $scope.formName = 'familyVisitsForm';
    $scope.documentName = 'family';
    $scope.documentResource = VisitResource;
    BaseFormController.call(this, $scope, $routeParams);

    $scope.sortOptions = [{value:"date",text: "Sort by Date"}, {value: "client",text: "Sort by Client"}];
    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.addVisit = function() {
        if($scope.sortOrder != 'date') {
            $scope.sortOrder = 'date';
        }

        if(!$scope.family.visits) {
            $scope.family.visits = [];
        }

        if($scope.family.visits.length > 0) {
            if(!$scope.family.visits[$scope.family.visits.length - 1].date ||
                !$scope.family.visits[$scope.family.visits.length - 1].client ||
                !$scope.family.visits[$scope.family.visits.length - 1].verification) {
                return;
            }
        }

        $scope.family.visits.push({
            client:$scope.family.primaryClient,
            date:new Date(),
            value:0.00,
            storeVoucher:'',
            reusableBagGiven:false,
            comments:'',
            verification:'',
            foodVoucher:'',
            approvedBy:'',
            _id:'000000000000000000000000'
        });

        //date: {type: Date, required: '{PATH} is required!'},
        //value: {type: Number },
        //storeVoucher: {type: String },
        //reusableBagGiven: {type: Boolean },
        //comments: {type: String },
        //verification: {type: String, required: '{PATH} is required!'},
        //foodVoucher: {type: String },
        //approvedBy: {type: String },
        //client : { type: mongoose.Schema.ObjectId, ref: 'Client' }
    };

    $scope.removeVisit = function(visit) {
        if($scope.family.visits && $scope.family.visits.length > 0) {
            var index = $scope.family.visits.indexOf(visit);
            $scope.family.visits.splice(index, 1);
        }
    };

    $scope.reverseOrder = function() {
        return ($scope.sortOrder === 'date');
    };

    $scope.saveVisits = function() {
        //$scope.family.primaryClient = null;
        //$scope.family.clients = [];
        $scope.save();
    }

}
VisitListController.prototype = Object.create(BaseFormController.prototype);

angular.module('app').controller('VisitListController', VisitListController);