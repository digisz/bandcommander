(function () {
  var app = angular.module('bandcommanderApp', ['ngRoute', 'ngAnimate',
    'formly', 'formlyBootstrap'
  ])

  /* -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
  CONTROLLERS
  -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! */
  app.controller('MainCtrl', ["$scope", "Page",
    function ($scope, Page) {
      $scope.Page = Page;
    }
  ]); // END OF CONTROLLER

  app.controller('HomeController', ["$scope", "$http", "Event",
    "$location", "Page",

    function (
      $scope, $http, Event, $location, Page) {
      var controller = this;
      this.events = [];
      Page.setTitle("Startseite");
      Event.all()
        .success(function (data) {
          controller.events = data;
        });
      $scope.showEvent = function (eventID) {
        $location.path('event/' + eventID);
      };

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

  app.directive('addShow', function () {
    return {
      restrict: "E",
      templateUrl: "app/components/home/addshow.tmpl.html",
      scope: {
        showEvent: "=",
      }
    };
  }); // END OF DIRECTVE


  app.directive('footer', function () {
    return {
      restrict: "E",
      templateUrl: "app/shared/footer.tmpl.html"
    };
  }); // END OF DIRECTVE


})(); // END OF WRAPPER
