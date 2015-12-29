angular.module("bandcommanderApp")
.controller('HomeController', ["$scope", "$http", "Event",
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
