
angular.module('app').factory('mvClient', function($resource) {

    var ClientResource = $resource('/api/clients/:_id', {_id: "@id"}, {}
    );

    return ClientResource;
});