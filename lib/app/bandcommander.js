(function () {
  var app = angular.module('bandcommanderApp', ['ngRoute'])

  /* -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
  CONTROLLERS
  -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! */

  app.controller('HomeController', ["$scope", "$http", function ($scope,
    $http) {
    var store = this;
    this.events = [];
    $http.get('http://localhost:8080/api/events', {
        headers: {
          'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjdkMTk2MGU1NzgzNDQ2NzE4NGNhZDEiLCJuYW1lIjoicGFzY2FsIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImFkbWluIjp0cnVlLCJfX3YiOjB9.rpAx634ODPi4hK2DfYJgS_nIS_hJM012IVhYjhjZDpM'
        }
      })
      .success(function (data) {
        store.events = data;
      });

  }]); // END OF CONTROLLER

  app.controller('SingleEventController', ["$scope", "$http", '$routeParams',
    function ($scope, $http, $routeParams) {
      var eventID = $routeParams.eventID;
      var store = this;
      this.event = [];
      $http.get('http://localhost:8080/api/event/' + eventID, {
          headers: {
            'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjdkMTk2MGU1NzgzNDQ2NzE4NGNhZDEiLCJuYW1lIjoicGFzY2FsIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImFkbWluIjp0cnVlLCJfX3YiOjB9.rpAx634ODPi4hK2DfYJgS_nIS_hJM012IVhYjhjZDpM'
          }
        })
        .success(function (data) {
          store.event = data;
        });

    }
  ]); // END OF CONTROLLER

  /* -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
  DIRECTIVES
  -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! */

  app.directive('singleShowSmall', function () {
    return {
      restrict: "E",
      templateUrl: "app/components/home/singleShowSmall.tmpl.html"
    };
  }); // END OF DIRECTVE

  app.directive('footer', function () {
    return {
      restrict: "E",
      templateUrl: "app/shared/footer.tmpl.html"
    };
  }); // END OF DIRECTVE

  /* -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
  ROUTER
  -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! */
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.

    when('/', {
        templateUrl: 'views/home.view.html',
        controller: 'HomeController'
      })
      .
    when('/event/:eventID', {
      templateUrl: 'views/event.view.html',
      controller: 'SingleEventController'
    })

  }]);


})(); // END OF WRAPPER
