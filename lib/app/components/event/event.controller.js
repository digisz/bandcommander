angular.module("bandcommanderApp")
  .controller('SingleEventController', ["$scope", "$http",
    '$routeParams',
    'Event', 'Page', 'Toolbar', 'User',

    function ($scope, $http, $routeParams, Event, Page, Toolbar, User) {
      var vm = this;
      Toolbar.setAction("Back");

      if ($routeParams.eventID != "new") {
        $scope.onSubmit = function () {
          Event.update(vm.data);
        };
        // get data
        Event.one($routeParams.eventID)
          .then(function (res) {
            vm.data = res;
            Page.setTitle(vm.data.titel);
            vm.data.date = new Date(vm.data.date);
            vm.data.times.showtime = new Date(vm.data.times.showtime);
            // get all possible members for everyone
            User.all()
              .then(function (data) {
                vm.data.allMembers = data.data;
              })
          });
      }
      else {
        Page.setTitle("Neuer Event");
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
