angular.module("bandcommanderApp")
  .controller('HomeController', ["$scope", "$http", "Event",
    "$location", "Page", "Toolbar",

    function (
      $scope, $http, Event, $location, Page, Toolbar) {
      var controller = this;
      this.events = [];
      Page.setTitle("Startseite");
      Toolbar.setAction("Menu")
      Event.all()
        .then(
          function (res) {
            controller.events = res;
          });
      $scope.showEvent = function (eventID) {
        $location.path('event/' + eventID);
      };

    }
  ]); // END OF CONTROLLER
