angular.module("bandcommanderApp")
  .factory("Event", ["$http", "$rootScope", "AUTH_EVENTS", function EventFactory(
    $http,
    $rootScope, AUTH_EVENTS) {
    return {
      all: function () {
        return $http({
            method: "GET",
            url: "http://localhost:8080/api/events/",
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
            url: "http://localhost:8080/api/event/" + id,
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
            url: "http://localhost:8080/api/event/new/",
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
            url: "http://localhost:8080/api/event/" + data._id,
            data: data,
            headers: {
              'x-access-token': $rootScope.jwt
            }
          })
        }
        //,
        // login: function (data) {
        //   return $http({
        //     method: "POST",
        //     url: "http://localhost:8080/api/authenticate",
        //     data: data,
        //     headers: {
        //       'x-access-token': $rootScope.jwt
        //     }
        //   })
        // }

    };
  }]);
