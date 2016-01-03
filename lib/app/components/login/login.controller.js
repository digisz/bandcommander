angular.module("bandcommanderApp")
  .controller('LoginController', ["Event", "Page", "$rootScope", "$scope",
    "AUTH_EVENTS", "AuthService", "$location",

    function (Event, Page, $rootScope, $scope, AUTH_EVENTS, AuthService,
      $location) {
      $scope.credentials = {
        name: '',
        password: ''
      };
      $scope.wrong = false;
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
      $rootScope.$on(AUTH_EVENTS.loginFailed, function () {
        $scope.wrong = true;
        $scope.credentials = {
          name: '',
          password: ''
        };
      })

    }
  ]); // END OF CONTROLLER