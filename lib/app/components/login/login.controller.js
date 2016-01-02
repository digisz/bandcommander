angular.module("bandcommanderApp")
  .controller('LoginController', ["Event", "Page","$rootScope","$scope","AUTH_EVENTS","AuthService",

  function (Event,Page, $rootScope,$scope, AUTH_EVENTS,AuthService) {
$scope.credentials = {
  name: '',
  password: ''
};
      Page.setTitle("Login");
      $scope.login = function (credentials) {
      AuthService.login(credentials)
      .then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });

  };

    }
  ]); // END OF CONTROLLER
