angular.module("bandcommanderApp")
  .factory("Event", ["$http", "$rootScope", function EventFactory($http,
    $rootScope) {
    return {
      all: function () {
        return $http({
          method: "GET",
          url: "http://localhost:8080/api/events/",
          headers: {
            'x-access-token': $rootScope.jwt
          }
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
    }
  }]);
