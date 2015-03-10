angular.module('app').factory('Identity', function($window, User) {
  var currentUser;
  if(!!$window.bootstrappedUserObject) {
    currentUser = new User();
    angular.extend(currentUser, $window.bootstrappedUserObject);
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    },

    isAuthorized: function(roles) {
        var args = Array.prototype.slice.call(arguments);

        if(!this.currentUser) {
            return false;
        }

        var inrole = false;
        var that = this;
        args.forEach(function(role) {
          if(that.currentUser.roles.indexOf(role) >= 0) {
              inrole = true;
          }
        });

        return inrole;
    }
  }
});