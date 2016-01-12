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
