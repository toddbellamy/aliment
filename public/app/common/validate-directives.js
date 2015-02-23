
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


var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
angular.module('app').directive('smartFloat', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (FLOAT_REGEXP.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace(',', '.'));
                } else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });
        }
    };
});
