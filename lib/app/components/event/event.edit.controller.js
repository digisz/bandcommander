angular.module("bandcommanderApp")
  .controller('SingleEventEditController', ["$scope", "$http",
    '$routeParams',
    'Event', 'Page', 'Toolbar', 'User', "$location",

    function ($scope, $http, $routeParams, Event, Page, Toolbar, User,
      $location) {
      var vm = this;
      Toolbar.setAction("Back");
      $scope.updateMembers = function () {
        User.band(vm.data.band)
          .then(function (res) {
            vm.data.members = res.members;
          })
      };

      // define save function
      if ($routeParams.eventID != "new") {
        $scope.onSubmit = function () {
          Event.update(vm.data)
            .then(function (data) {
              $location.path('/status/success');
            });
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
            // get all possible members for everyone
            User.all()
              .then(function (data) {
                vm.data.allMembers = data.data;
              })
          });
      }
      else {
        Page.setTitle("Neuer Event");
        // define save function
        $scope.onSubmit = function () {
          Event.create(vm.data);
          vm.data.links = [];
          vm.data.members = [];
          // get all possible members for everyone
          User.all()
            .then(function (data) {
              vm.data.allMembers = data.data;
            })
        };
      }
    }
  ]); // END OF CONTROLLER
