
angular.module('app').factory('mvClient', function($resource) {

    var ClientResource = $resource('/api/clients/:id', { id:'@_id' });

    return ClientResource;
});