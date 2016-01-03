angular.module("bandcommanderApp")
  .service('Session', ["$rootScope", "$cookies", "$window", function (
    $rootScope, $cookies, $window) {
    this.create = function (sessionId, userId, userRole, userJwt) {
      this.id = sessionId;
      this.userId = userId;
      this.jwt = userJwt;
      this.userRole = userRole;
      $rootScope.jwt = userJwt;
      var now = new $window.Date();
      var exp = new $window.Date(now.getFullYear(), now.getMonth() + 6,
        now
        .getDate());
      $cookies.put('jwt', userJwt, {
        expires: exp
      });
    };
    this.destroy = function () {
      this.id = null;
      this.userId = null;
      this.userRole = null;
    };
  }])
