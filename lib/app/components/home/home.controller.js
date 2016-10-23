angular.module("bandcommanderApp")
  .controller('HomeController', ["$scope","$route", "$http", "Event",
    "$location", "Page", "Toolbar",

    function (
      $scope,$route, $http, Event, $location, Page, Toolbar) {
      var controller = this;
      this.events = [];
      Page.setTitle("Startseite");
      Toolbar.setAction("Menu");
      // TODO check for errors

      var paramValue = $route.current.$$route.paramExample;
      this.paramValue = paramValue;
      Event.all(paramValue)
        .then(
          function (res) {
            controller.events = res;
          });
      $scope.showEvent = function (eventID) {
        if(eventID!="new"){
          $location.path('event/' + eventID);
        }
        else{
          $location.path('event/edit/' + eventID);
        }
      };

    }
  ]); // END OF CONTROLLER
