angular.module("bandcommanderApp")
.controller('SingleEventEditController', ["$scope", "$http",
'$routeParams',
'Event', 'Page', 'Toolbar', 'User', "$location",

function ($scope, $http, $routeParams, Event, Page, Toolbar, User,
  $location) {
    var vm = this;
    vm.data = "";
    Toolbar.setAction("Back");

    $scope.$watch('vm.data.band', function () {
      if(vm.data.band != null){
      User.band(vm.data.band)
      .then(function (res) {
        vm.data.members = res.members;
      })
    }
    }
  );

    // THIS HAPPENS IF IT IS NOT A NEW EVENT
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
        if(vm.data.date != null){vm.data.date = new Date(vm.data.date)}else{vm.data.date =""};
        if(vm.data.times.showtime != null){vm.data.times.showtime = new Date(vm.data.times.showtime)}else{vm.data.times.showtime =""};
        if(vm.data.times.getin != null){vm.data.times.getin = new Date(vm.data.times.getin)}else{vm.data.times.getin=""};
        if(vm.data.times.food != null){vm.data.times.food = new Date(vm.data.times.food)}else{vm.data.times.food=""};
        if(vm.data.times.setup != null){vm.data.times.setup = new Date(vm.data.times.setup)}else{vm.data.times.setup =""};
        if(vm.data.times.start != null){vm.data.times.start = new Date(vm.data.times.start)}else{vm.data.times.start =""};
        // get all possible members for everyone
        User.all()
        .then(function (data) {
          vm.data.allMembers = data.data;
        })
      });
    }
    /* If it is a NEW EVENT */
    else {
      // SET PROPER PAGE TITLE
      Page.setTitle("Neuer Event");

      // THIS HAPPENS ON SAVE
      $scope.onSubmit = function () {
        Event.create(vm.data).then(function (data) {
          $location.path('/status/success');
        });
      };

      // get all possible members for everyone
      User.all()
      .then(function (data) {
        vm.data.allMembers = data.data;
      })
    }
  }
]); // END OF CONTROLLER
