(function () {
  var app = angular.module('bandcommanderApp', ['ngRoute', 'ngAnimate'])

  /* -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
  CONTROLLERS
  -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! */

  app.controller('HomeController', ["$scope", "$http", "Event", "$location",
    function (
      $scope, $http, Event, $location) {
      var controller = this;
      this.events = [];
      Event.all()
        .success(function (data) {
          controller.events = data;
        });
      $scope.showEvent = function (eventID) {
        $location.path('event/' + eventID);
      };

    }
  ]); // END OF CONTROLLER

  app.controller('SingleEventController', ["$scope", "$http", '$routeParams',
    'Event',
    function ($scope, $http, $routeParams, Event) {
      var store = this;
      this.event = [];
      Event.one($routeParams.eventID)
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


})(); // END OF WRAPPER
