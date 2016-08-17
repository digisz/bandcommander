angular.module("bandcommanderApp")
  .controller('MagiclinkRedirectController', ["Page", "$rootScope", "$scope",
    "AUTH_EVENTS", "AuthService", "$location","$routeParams",

    function (Page, $rootScope, $scope, AUTH_EVENTS, AuthService,
      $location,$routeParams) {
      var credentials = {
        name: $routeParams.user,
        password: $routeParams.token,
        type:'magiclink'
      };
      $scope.wrong = false;
      Page.setTitle("Login");
      AuthService.login(credentials)
          .then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.setCurrentUser(user);
            $location.path("/");
          }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          });

    }
  ]); // END OF CONTROLLER
