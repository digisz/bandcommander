angular.module("bandcommanderApp")
  .factory("Event", ["$http", "$rootScope", "AUTH_EVENTS", "$rootScope",
    "$cookies",
    function EventFactory(
      $http,
      $rootScope, AUTH_EVENTS, $rootScope, $cookies) {

      // get jwt token
      $rootScope.jwt = $cookies.get('jwt');
      $rootScope.apiUrl = "http://api.bandcommander.ch"
      $rootScope.apiUrl = "http://localhost:8080"

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
