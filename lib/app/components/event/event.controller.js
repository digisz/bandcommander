angular.module("bandcommanderApp")
  .controller('SingleEventController', ["$scope", "$http",
    '$routeParams',
    'Event', 'Page', 'Toolbar',

    function ($scope, $http, $routeParams, Event, Page, Toolbar) {
      var vm = this;
      Toolbar.setAction("Back");
      if ($routeParams.eventID != "new") {
        $scope.onSubmit = function () {
          Event.update(vm.data);
        };
        // get data
        Event.one($routeParams.eventID)
          .success(function (data) {
            vm.data = data;
            Page.setTitle(vm.data.titel);
            vm.data.date = new Date(vm.data.date);
            vm.data.times.showtime = new Date(vm.data.times.showtime);

          });
      }
      else {
        Page.setTitle("Neuer Event");
        $scope.onSubmit = function () {
          Event.create(vm.data);
        };
      }
    }
  ]); // END OF CONTROLLER
