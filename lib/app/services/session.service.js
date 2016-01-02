angular.module("bandcommanderApp")
  .service('Session', ["$rootScope", "$cookies", function ($rootScope, $cookies) {
    this.create = function (sessionId, userId, userRole, userJwt) {
      this.id = sessionId;
      this.userId = userId;
      this.jwt = userJwt;
      this.userRole = userRole;
      $rootScope.jwt = userJwt;
      $cookies.put('jwt', userJwt);
    };
    this.destroy = function () {
      this.id = null;
      this.userId = null;
      this.userRole = null;
    };
  }])
