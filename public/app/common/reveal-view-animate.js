angular.module('app').animation('.reveal-view-animate', function() {
    return {

        enter: function(element, done) {
            $(element).hide();
            element
            .fadeIn(700, done)
            .animate(
                { marginLeft: 0, marginRight: 0 },
                { queue: false, duration: 'slow' }
            );;
            return function() {
                element.stop();
            }
        },
        leave: function(element, done) {
            $(element).hide();
            return function() {
                element.stop();
            }
        }
    }
});