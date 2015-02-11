angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider, $httpProvider) {
    var routeRoleChecks = {
        admin: { auth: function(mvAuth) {
          return mvAuth.authorizeCurrentUserForRoute('admin');
        }},
        user: { auth: function(mvAuth) {
          return mvAuth.authorizeAuthenticatedUserForRoute();
        }}
    };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main',
            controller: 'mvMainController'
        })
        .when('/admin/users', { templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListController', resolve: routeRoleChecks.admin
        })
        .when('/signup', { templateUrl: '/partials/account/signup',
            controller: 'mvSignupController'
        })
        .when('/profile', { templateUrl: '/partials/account/profile',
            controller: 'mvProfileController', resolve: routeRoleChecks.user
        })
        .when('/clients', { templateUrl: '/partials/clients/client-list',
            controller: 'mvClientListController'
        })
        .when('/clients/:id', { templateUrl: '/partials/clients/client-details',
            controller: 'mvClientDetailController'
        })
        .when('/families', { templateUrl: '/partials/families/family-list',
            controller: 'FamilyListController'
        });

    $httpProvider.defaults.transformResponse.push(function(responseData) {
        if (typeof responseData === "object") {
            convertDateStringsToDates(responseData);
        }

        return responseData;
    });

    var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

    var convertDateStringsToDates = function (input) {
        // Ignore things that aren't objects.
        if (typeof input !== "object") return input;

        for (var key in input) {
            if (!input.hasOwnProperty(key)) continue;

            var value = input[key];
            var match;
            // Check for string properties which look like dates.
            if (typeof value === "string" && (match = value.match(regexIso8601))) {
                var milliseconds = Date.parse(match[0])
                if (!isNaN(milliseconds)) {
                    input[key] = new Date(milliseconds);
                }
            } else if (typeof value === "object") {
                // Recurse into object
                convertDateStringsToDates(value);
            }
        }
    };
});

angular.module('app').run(function($rootScope, $location) {

    $rootScope.$on('$routeChangeError', function(evt, curent, previous, rejection) {
        console.log('$stateChangeError - fired when an error occurs during transition.');
        console.log(arguments);

        if(rejection === 'not authorized') {
            $location.path('/');
        }
    });

    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
    });

    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
    });

    $rootScope.$on('$viewContentLoaded',function(event){
        console.log('$viewContentLoaded - fired after dom rendered',event);
    });

    $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
        console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
        console.log(unfoundState, fromState, fromParams);
    });

});