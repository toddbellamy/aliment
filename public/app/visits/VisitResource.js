
angular.module('app').factory('VisitResource', function($resource) {

    var VisitResource = $resource('/api/visits/:id', { id:'@_id' });

    return VisitResource;

});