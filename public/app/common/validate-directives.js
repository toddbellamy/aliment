
angular.module('app').directive('clientdob', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.clientdob = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                var today = new Date();
                today.setHours(0,0,0,0);

                if (modelValue.constructor === Date && modelValue < today) {
                    return true;
                }

                // it is invalid
                return false;
            }
        }
    };
});