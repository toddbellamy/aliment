
angular.module('app').filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});


angular.module('app').filter('postal', function () {
    return function (postal) {
        if (!postal) {
            return '';
        }

        if(postal.length == 6) {
            return (postal.slice(0,3) + ' ' + postal.slice(3,6));
        }
        else {
            return postal;
        }
    };
});

angular.module('app').filter('pageSlice', function () {
   return function(list, pageSize, currentPage) {
       if(list) {
           return list.slice(((currentPage-1)*pageSize), ((currentPage)*pageSize));
       }
   };
});
