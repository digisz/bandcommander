angular.module("bandcommanderApp")
  .factory('Session', ["$rootScope", "$cookies", "$window", function SessionFactory(
    $rootScope, $cookies, $window) {

    return {
      create: function (the_id, the_userName, the_userRole, the_jwt) {
        var id = the_id;
        var userName = the_userName;
        var jwt = the_jwt;
        var userRole = the_userRole;
        var now = new $window.Date();
        var exp = new $window.Date(now.getFullYear(), now.getMonth() + 6,
          now
          .getDate());
        $rootScope.jwt = jwt;
        $window.localStorage.setItem("jwt", jwt);
        $window.localStorage.setItem("userName", userName);
        $window.localStorage.setItem("userRole", userRole);
        $window.localStorage.setItem("sessionId", id);
        $cookies.put('jwt', jwt, {
          expires: exp
        });
        return id;
      },
      destroy: function () {
        $window.localStorage.removeItem("jwt");
        $window.localStorage.removeItem("userId");
        $window.localStorage.removeItem("userRole");
        $window.localStorage.removeItem("sessionId");
      },
      id: function () {
        return $window.localStorage.getItem("sessionId");
      },
      userName: function () {
        return $window.localStorage.getItem("userName");
      },
      jwt: function () {
        return $window.localStorage.getItem("jwt");
      },
      userRole: function () {
        return $window.localStorage.getItem("userRole");
      }
    };
  }])
