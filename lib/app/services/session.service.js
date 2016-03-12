angular.module("bandcommanderApp")
  .factory('Session', ["$rootScope", "$cookies", "$window", function SessionFactory(
    $rootScope, $cookies, $window) {

    return {
      create: function (the_id, the_userId, the_userRole, the_jwt) {
        var id = the_id;
        var userId = the_userId;
        var jwt = the_jwt;
        var userRole = the_userRole;
        var now = new $window.Date();
        var exp = new $window.Date(now.getFullYear(), now.getMonth() + 6,
          now
          .getDate());
        $rootScope.jwt = jwt;
        $window.sessionStorage.setItem("jwt", jwt);
        $window.sessionStorage.setItem("userId", userId);
        $window.sessionStorage.setItem("userRole", userRole);
        $window.sessionStorage.setItem("sessionId", id);
        $cookies.put('jwt', jwt, {
          expires: exp
        });
        return id;
      },
      destroy: function () {
        $window.sessionStorage.removeItem("jwt");
        $window.sessionStorage.removeItem("userId");
        $window.sessionStorage.removeItem("userRole");
        $window.sessionStorage.removeItem("sessionId");
      },
      id: function () {
        return $window.sessionStorage.getItem("sessionId");
      },
      userId: function () {
        return $window.sessionStorage.getItem("userId");
      },
      jwt: function () {
        return $window.sessionStorage.getItem("jwt");
      },
      userRole: function () {
        return $window.sessionStorage.getItem("userRole");
      }
    };
  }])
