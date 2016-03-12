angular.module("bandcommanderApp")
  .factory('AuthService', ['$http', 'Session', '$rootScope', function ($http,
    Session, $rootScope) {

    var authService = {};

    authService.login = function (credentials) {
      return $http({
          method: "POST",
          url: $rootScope.apiUrl + "/authenticate",
          data: credentials
        })
        .then(function (res) {
          Session.create(res.data.id, res.data.id,
            res.data.role, res.data.token);
          return res.data.user;
        });
    };

    authService.isAuthenticated = function () {
      return !!Session.userRole();
    };

    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole()) !== -1);
    };

    return authService;
  }])

angular.module("bandcommanderApp")
  .factory("Event", ["$http", "$rootScope", "AUTH_EVENTS", "$rootScope",
    "$cookies",
    function EventFactory(
      $http,
      $rootScope, AUTH_EVENTS, $rootScope, $cookies) {

      // get jwt token
      $rootScope.jwt = $cookies.get('jwt');
      //  $rootScope.apiUrl = "http://api.bandcommander.ch"
      $rootScope.apiUrl = "http://localhost:8080"

      return {
        all: function () {
          return $http({
              method: "GET",
              url: $rootScope.apiUrl + "/events/",
              headers: {
                'x-access-token': $rootScope.jwt
              }
            })
            .then(function (data) {
              return data.data;
            }, function (err) {
              $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            });
        },
        one: function (id) {
          return $http({
              method: "GET",
              url: $rootScope.apiUrl + "/event/" + id,
              headers: {
                'x-access-token': $rootScope.jwt
              }
            })
            .then(function (data) {
              return data.data;
            }, function (err) {
              $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            })
        },
        create: function (data) {
          return $http({
              method: "POST",
              url: $rootScope.apiUrl + "/event/new/",
              data: data,
              headers: {
                'x-access-token': $rootScope.jwt
              }
            })
            .then(function (data) {
              return data.data;
            }, function (err) {
              $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            })
        },
        update: function (data) {
          return $http({
            method: "POST",
            url: $rootScope.apiUrl + "/event/" + data._id,
            data: data,
            headers: {
              'x-access-token': $rootScope.jwt
            }
          })
        }
      };
    }
  ]);

angular.module("bandcommanderApp")
.factory('Page', function PageFactory() {
   var title = 'Startseite';
   return {
     title: function() { return title; },
     setTitle: function(newTitle) { title = newTitle+" | Bandcommander" }
   };
});

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

angular.module("bandcommanderApp")
.factory('Toolbar',function ToolbarFactory() {
  var action = 'ng-click="Page.setTitle()"';
  var icon = "🤓";
   return {
     action: function() { return action;},
     icon: function() { return icon;},
     setAction: function(newAction) {
       if(newAction == "Menu"){
          icon ="🍔";
     }
     if(newAction == "Back"){
       icon ="⬅️";
   }
    }
   };
});

angular.module("bandcommanderApp")
  .factory("User", ["$http", "$rootScope", "AUTH_EVENTS", "$rootScope",
    "$cookies",
    function UserFactory(
      $http,
      $rootScope, AUTH_EVENTS, $rootScope, $cookies) {

      // get jwt token
      $rootScope.jwt = $cookies.get('jwt');

      return {
        all: function () {
          return $http({
              method: "GET",
              url: $rootScope.apiUrl + "/users/",
              headers: {
                'x-access-token': $rootScope.jwt
              }
            })
            .then(function (data) {
              return data.data;
            }, function (err) {
              $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            });
        },
        band: function (theBand) {
          return $http({
              method: "GET",
              url: $rootScope.apiUrl + "/band/" + theBand,
              headers: {
                'x-access-token': $rootScope.jwt
              }
            })
            .then(function (data) {
              return data.data;
            }, function (err) {
              $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            });
        },
        one: function (id) {
          return $http({
              method: "GET",
              url: $rootScope.apiUrl + "/user/" + id,
              headers: {
                'x-access-token': $rootScope.jwt
              }
            })
            .then(function (data) {
              return data.data;
            }, function (err) {
              $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            })
        },
        create: function (data) {
          return $http({
              method: "POST",
              url: $rootScope.apiUrl + "/user/new/",
              data: data,
              headers: {
                'x-access-token': $rootScope.jwt
              }
            })
            .then(function (data) {
              return data.data;
            }, function (err) {
              $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            })
        },
        update: function (data) {
          return $http({
            method: "POST",
            url: $rootScope.apiUrl + "/user/" + data._id,
            data: data,
            headers: {
              'x-access-token': $rootScope.jwt
            }
          })
        }
      };
    }
  ]);
