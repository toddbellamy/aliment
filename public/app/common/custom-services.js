angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('Notifier', function(mvToastr) {
    return {
        notify: function(msg) {
            mvToastr.success(msg);
            console.log(msg);
        },
        error: function(msg) {
            mvToastr.error(msg);
            console.log(msg);
        },
        alert: function(msg) {
            mvToastr.info(msg);
            console.log(msg);
        }
    };
});

angular.module('app').factory('TableHelper', function() {
    return {

        freezeColWidths: function (table$, freeze) {
            table$.find('th').each(function () {
                var hd$ = $(this);
                var width = hd$.innerWidth();
                if (freeze) {
                    $(this).css('width', width + 'px');
                }
                else {
                    $(this).css('width', 'initial');
                }

            })
        }
    };
});
