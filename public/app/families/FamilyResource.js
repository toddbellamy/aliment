
angular.module('app').factory('FamilyResource', function($resource) {

    var FamilyResource = $resource('/api/families/:id', { id:'@_id'});

    return FamilyResource;
});