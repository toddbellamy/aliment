angular.module('app').factory('Auth', function($http, Identity, $q, User, Notifier) {
    return {
        authenticateUser: function(username, password) {
            var deferred = $q.defer();
            $http.post('/login', {username:username, password:password}).then(function(response) {
                if(response.data.success) {
                    var user = new User();
                    angular.extend(user, response.data.user);
                    Identity.currentUser = user;
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            });
            return deferred.promise;
        },

        createUser: function(newUserData) {
            var newUser = new User(newUserData);
            var deferred = $q.defer();

            newUser.$save().then(function() {

                deferred.resolve();
            }, function(response) {
                deferred.reject(response.data.reason);
            });

            return deferred.promise;
        },

        updateUser: function(userData) {
            var deferred = $q.defer();
            var user = userData;

            user.$update().then(function() {

                deferred.resolve();
            }, function(response) {
                deferred.reject(response.data.reason);
            });
            return deferred.promise;
        },


        updateCurrentUser: function(newUserData) {
            var deferred = $q.defer();

            var clone = angular.copy(Identity.currentUser);
            angular.extend(clone, newUserData);
            clone.$update().then(function() {
                Identity.currentUser = clone;
                deferred.resolve();
            }, function(response) {
                deferred.reject(response.data.reason);
            });
            return deferred.promise;
        },

        logoutUser: function() {
            var deferred = $q.defer();
            $http.post('/logout', {logout:true}).then(function() {
                Identity.currentUser = undefined;
                deferred.resolve();
            });
            return deferred.promise;
        },

        authorizeCurrentUserForRoute: function(role) {
            if(Identity.isAuthorized(role)) {
                return true;
            }
            else {
                Notifier.error("Not authorized");
                return $q.reject('not authorized');
            }

        },

        authorizeAuthenticatedUserForRoute: function() {
            if(Identity.isAuthenticated()) {
                return true;
            }
            else {
                this.forceLogin = true;
                Notifier.alert("Please login");
                setTimeout(function() { $('#userName').focus(); }, 250);
                return $q.reject('not authenticated');
            }
        },
        forceLogin: false
  }
});