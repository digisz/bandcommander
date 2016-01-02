angular.module("bandcommanderApp")
  .factory('AuthService', ['$http', 'Session', '$rootScope', function ($http,
    Session, $rootScope) {

    var authService = {};

    authService.login = function (credentials) {
      return $http({
          method: "POST",
          url: "http://localhost:8080/api/authenticate",
          data: credentials,
          headers: {
            'x-access-token': $rootScope.jwt
          }
        })
        .then(function (res) {
          console.log(res);
          Session.create(res.data.id, res.data.id,
            res.data.role, res.data.token);
          return res.data.user;
        });
    };

    authService.isAuthenticated = function () {
      return !!Session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;
  }])
