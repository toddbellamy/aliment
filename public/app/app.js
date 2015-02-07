angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
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
        });

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