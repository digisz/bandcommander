angular.module("bandcommanderApp")
  .controller('LoginController', ["Event", "Page", "$rootScope", "$scope",
    "AUTH_EVENTS", "AuthService", "$location",

    function (Event, Page, $rootScope, $scope, AUTH_EVENTS, AuthService,
      $location) {
      $scope.credentials = {
        name: '',
        password: ''
      };
      Page.setTitle("Login");
      $scope.login = function (credentials) {
        $scope.waiting = AuthService.login(credentials)
          .then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.setCurrentUser(user);
            $location.path("/");
          }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          });

      };

    }
  ]); // END OF CONTROLLER
