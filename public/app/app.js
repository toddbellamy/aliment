angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate', 'ui.utils', 'ui.bootstrap', 'ui.bootstrap.tpls', 'data.util']);

angular.module('app').config(function($routeProvider, $locationProvider, $httpProvider, dataUtilProvider) {
    var routeRoleChecks = {
        admin: { auth: function(Auth) {
          return Auth.authorizeCurrentUserForRoute('admin');
        }},
        user: { auth: function(Auth) {
          return Auth.authorizeAuthenticatedUserForRoute();
        }}
    };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main',
            controller: 'MainController'
        })
        .when('/admin/users', { templateUrl: '/partials/admin/user-list',
            controller: 'UserListController', resolve: routeRoleChecks.admin
        })
        .when('/admin/users/:id', { templateUrl: '/partials/admin/user-detail',
            controller: 'UserDetailController', resolve: routeRoleChecks.admin
        })
        .when('/clients', { templateUrl: '/partials/clients/client-list',
            controller: 'ClientListController', resolve: routeRoleChecks.user
        })
        .when('/clients/:id', { templateUrl: '/partials/clients/client-details',
            controller: 'ClientDetailController', resolve: routeRoleChecks.user
        })
        .when('/families', { templateUrl: '/partials/families/family-list',
            controller: 'FamilyListController', resolve: routeRoleChecks.user
        })
        .when('/families/:id', { templateUrl: '/partials/families/family-details',
            controller: 'FamilyDetailController', resolve: routeRoleChecks.user
        })
        .when('/visits/:id', { templateUrl: '/partials/visits/visit-list',
            controller: 'VisitListController', resolve: routeRoleChecks.user
        })
        .when('/profile/profile', { templateUrl: '/partials/profile/profile',
            controller: 'ProfileController', resolve: routeRoleChecks.user
        });

    $httpProvider.defaults.transformResponse.push(function(responseData) {
        if (typeof responseData === "object") {
            dataUtilProvider.convertDateStringsToDates(responseData);
        }

        return responseData;

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