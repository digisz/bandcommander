angular.module("bandcommanderApp")
  .controller('SingleEventController', ["$scope", "$http",
    '$routeParams',
    'Event', 'Page',

    function ($scope, $http, $routeParams, Event, Page) {
      var vm = this;

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
