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

      $scope.getPromoter = function (promoter) {
        alert("TODO, Promoter Details für "+promoter);
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
        });
    }
  ]); // END OF CONTROLLER
