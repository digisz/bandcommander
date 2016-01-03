angular.module("bandcommanderApp")
  .run(function ($rootScope, AUTH_EVENTS, AuthService, $location) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!authorizedRoles == "*") {
        if (!AuthService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          if (AuthService.isAuthenticated()) {
            // user is not allowed
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          }
          else {
            // user is not logged in
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }
        }
      }
    });
    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
      $location.path("/login");
    });
  });
