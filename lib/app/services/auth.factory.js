angular.module("bandcommanderApp")
  .factory('AuthService', ['$http', 'Session', '$rootScope', function ($http,
    Session, $rootScope) {

    var authService = {};

    authService.login = function (credentials) {
      return $http({
          method: "POST",
          url: $rootScope.apiUrl + "/authenticate",
          data: credentials
        })
        .then(function (res) {
          Session.create(res.data.id, res.data.id,
            res.data.role, res.data.token);
          return res.data.user;
        });
    };

    authService.isAuthenticated = function () {
      return !!Session.userRole();
    };

    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole()) !== -1);
    };

    return authService;
  }])
