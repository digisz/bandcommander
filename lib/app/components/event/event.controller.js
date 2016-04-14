angular.module("bandcommanderApp")
  .controller('SingleEventController', ["$scope", "$http",
    '$routeParams',
    'Event', 'Page', 'Toolbar', 'User', "$location",

    function ($scope, $http, $routeParams, Event, Page, Toolbar, User,
      $location) {
      var vm = this;
      Toolbar.setAction("Back");

      $scope.editEvent = function (eventID) {
        $location.path('event/edit/' + eventID);
      };
      // get data for an event
      Event.one($routeParams.eventID)
        .then(function (res) {
          vm.data = res;
          Page.setTitle(vm.data.titel);
          vm.data.date = new Date(vm.data.date);
          vm.data.times.showtime = new Date(vm.data.times.showtime);
          vm.data.times.getin = new Date(vm.data.times.getin);
          vm.data.times.food = new Date(vm.data.times.food);
          vm.data.times.setup = new Date(vm.data.times.setup);
          vm.data.times.start = new Date(vm.data.times.start);
        });
    }
  ]); // END OF CONTROLLER
