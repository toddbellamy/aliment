describe('VisitListController', function() {

    var $scope, $controller;

    beforeEach(inject(function($rootScope, $routeParams, $httpBackend, VisitResource, Notifier, _$controller_){


        $scope = $rootScope.$new();
        $controller = _$controller_('VisitListController', { $scope: $scope, $routeParams:$routeParams, VisitResource:VisitResource, Notifier:Notifier });

        $scope.$apply();

    }));

    describe('loadInitialDoc', function() {
       it('Should load first Family', function(done) {

           var p = $scope.loadInitialDoc();
           p.then(function(result) {
               expect(result).not.toBeNull();
               expect($scope.family).not.toBeNull();
           });

           done();

       });
    });

    describe('addVisit', function() {

        it('It should add a visit with default values', inject(function(VisitListController) {

            deferredResolution.resolve("Here's your data!");

            $scope.$apply();

            expcect($scope.family.visits.length > 0).toBe(true);


        }));
    });

});