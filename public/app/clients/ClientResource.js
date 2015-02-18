
angular.module('app').factory('ClientResource', function($resource) {

    var ClientResource = $resource('/api/clients/:id', { id:'@_id' });

    return ClientResource;

});