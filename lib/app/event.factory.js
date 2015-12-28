angular.module("bandcommanderApp")
  .factory("Event", ["$http", function EventFactory($http) {
    return {
      all: function () {
        return $http({
          method: "GET",
          url: "http://localhost:8080/api/events/",
          headers: {
            'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjdkMTk2MGU1NzgzNDQ2NzE4NGNhZDEiLCJuYW1lIjoicGFzY2FsIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImFkbWluIjp0cnVlLCJfX3YiOjB9.rpAx634ODPi4hK2DfYJgS_nIS_hJM012IVhYjhjZDpM'
          }
        });
      },
      one: function (id) {
        return $http({
          method: "GET",
          url: "http://localhost:8080/api/event/" + id,
          headers: {
            'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjdkMTk2MGU1NzgzNDQ2NzE4NGNhZDEiLCJuYW1lIjoicGFzY2FsIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImFkbWluIjp0cnVlLCJfX3YiOjB9.rpAx634ODPi4hK2DfYJgS_nIS_hJM012IVhYjhjZDpM'
          }
        })
      },
      create: function (data) {
        return $http({
          method: "POST",
          url: "http://localhost:8080/api/event/new/",
          data: data,
          headers: {
            'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjdkMTk2MGU1NzgzNDQ2NzE4NGNhZDEiLCJuYW1lIjoicGFzY2FsIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImFkbWluIjp0cnVlLCJfX3YiOjB9.rpAx634ODPi4hK2DfYJgS_nIS_hJM012IVhYjhjZDpM'
          }
        })
      },
      update: function (data) {
        // TODO
      },
    }
  }]);
