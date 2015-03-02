
angular.module('app').directive('dateOfBirth', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.dateOfBirth = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    ctrl.$setValidity('dob', true);
                    return true;
                }

                var today = new Date();
                today.setHours(0,0,0,0);

                if (modelValue.constructor === Date && modelValue < today &&
                    (today.getFullYear() -  modelValue.getFullYear() <= 120)) {
                    ctrl.$setValidity('dob', true);
                    return true;
                }

                // it is invalid
                ctrl.$setValidity('dob', false);
                return false;
            }
        }
    };
});


angular.module('app').directive('smartFloat', function ($filter) {
    var FLOAT_REGEXP_1 = /^\$?\d+(.\d{3})*(\,\d*)?$/; //Numbers like: 1.123,56
    var FLOAT_REGEXP_2 = /^\$?\d+(,\d{3})*(\.\d*)?$/; //Numbers like: 1,123.56
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (FLOAT_REGEXP_1.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace('.', '').replace(',', '.'));
                } else if (FLOAT_REGEXP_2.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace(',', ''));
                } else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });
            ctrl.$formatters.unshift(
                function (modelValue) {
                    return $filter('number')(parseFloat(modelValue) , 2);
                }
            );
        }
    };
});