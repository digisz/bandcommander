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
