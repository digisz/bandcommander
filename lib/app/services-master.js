angular.module("bandcommanderApp")
  .factory('AuthService', ['Event','$http', 'Session', '$rootScope', function (Event,$http,
    Session, $rootScope) {

    var authService = {};

    authService.sms = function (credentials) {
        return $http({
            method: "POST",
            url: $rootScope.apiUrl + "/authenticate/magiclink/",
            data: credentials
          });
          return;
      };


    authService.login = function (credentials) {
      return $http({
          method: "POST",
          url: $rootScope.apiUrl + "/authenticate/",
          data: credentials
        })
        .then(function (res) {
          Session.create(res.data.id, res.data.user,
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
      $rootScope.apiUrl = "https://api.bandcommander.ch"
//      $rootScope.apiUrl = "http://localhost:8080"

      return {
        all: function (param) {
          var addition = "";
          if(param != "current"){addition=param};
          return $http({
              method: "GET",
              url: $rootScope.apiUrl + "/events/"+addition,
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
        },
        delete: function (data) {
          return $http({
            method: "DELETE",
            url: $rootScope.apiUrl + "/event/" + data,
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
  .factory("Guestlist", ["$http", "$rootScope", "AUTH_EVENTS", "$rootScope",
    "$cookies",
    function GuestlistFactory(
      $http,
      $rootScope, AUTH_EVENTS, $rootScope, $cookies) {

      // get jwt token
      $rootScope.jwt = $cookies.get('jwt');

      return {
        getGuests: function (eventID) {
          return $http({
              method: "GET",
              url: $rootScope.apiUrl + "/guestlist/" + eventID,
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
        addGuest: function (data) {
          return $http({
              method: "POST",
              url: $rootScope.apiUrl + "/guestlist/"+data.eventID,
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
        deleteGuest: function (guestID) {
          return $http({
            method: "DELETE",
            url: $rootScope.apiUrl + "/guestlist/" + guestID,
            headers: {
              'x-access-token': $rootScope.jwt
            }
          }).then(function (data) {
            return data.data;
          }, function (err) {
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          })
        },
        sendGuestlist: function (data) {
          return $http({
              method: "POST",
              url: $rootScope.apiUrl + "/mail/guestlist/"+data.eventID,
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
        }
      };
    }
  ]);

angular.module("bandcommanderApp")
  .factory('Page', function PageFactory() {
    var title = 'Startseite';
    return {
      title: function () {
        return title;
      },
      setTitle: function (newTitle) {
        title = newTitle + " | Bandcommander"
      }
    };
  });

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

angular.module("bandcommanderApp")
  .factory('Toolbar', function ToolbarFactory() {
    var action = '';
    var icon = "🤓";
    return {
      action: function () {
        return action;
      },
      icon: function () {
        return icon;
      },
      setAction: function (newAction) {
        if (newAction == "Menu") {
          icon = "🤖";
          action = "";
        }
        if (newAction == "Back") {
          icon = "⬅️";
          action = 'back';
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
