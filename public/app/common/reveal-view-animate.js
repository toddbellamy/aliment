angular.module('app').animation('.reveal-view-animate', function() {
    return {

        enter: function(element, done) {
            $(element).hide();
            element.fadeIn(500, done);
            return function() {
                element.stop();
            }
        },
        leave: function(element, done) {
            element.fadeOut(100, done)
            return function() {
                element.stop();
            }
        }
    }
});