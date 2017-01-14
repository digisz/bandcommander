angular.module("bandcommanderApp")
.controller('SingleEventController', ["$scope", "$http",
'$routeParams','Session',
'Event','Guestlist', 'Page', 'Toolbar', 'User', "$location","Angularytics","AuthService",

function ($scope, $http, $routeParams, Session, Event, Guestlist, Page, Toolbar, User,
  $location,Angularytics,AuthService) {
    var vm = this;
    Toolbar.setAction("Back");

    vm.admin = AuthService.isAuthorized("admin");

    // add action if someone clicks "edit show"
    $scope.editEvent = function (eventID) {
      $location.path('event/edit/' + eventID);
    };

    // prepare stuff to be copied to the clipboard
    var clipboard = new Clipboard('.clipboard');
    clipboard.on('success', function(e) {
      alert("Link kopiert");
      Angularytics.trackEvent("Copy Link", e.text);
      e.clearSelection();
    });

    $scope.getPromoter = function (promoter) {
      alert("TODO, Promoter Details für "+promoter);
    };

    vm.currentUser = Session.userName();

    Guestlist.getGuests($routeParams.eventID)
    .then(
      function (res) {
        vm.guests = res;
      });
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

      $scope.removeGuest = function (guest) {
        Guestlist.deleteGuest(guest._id);
        var index = vm.guests.indexOf(guest);
        vm.guests.splice(index,1);
      }

      $scope.addGuest = function (guest) {
        guest.eventID = $routeParams.eventID;
        Guestlist.addGuest(guest).then(function(result){
          // add to array
          vm.guests.push(result);
          vm.newGuest.name = "";
          vm.newGuest.plus = "";
        });

      }

      $scope.sendGuestlist = function () {
      var mail={};
      mail.email = vm.sendEmailTo;
      mail.guests = vm.guests;
      mail.eventID = $routeParams.eventID;
      Guestlist.sendGuestlist(mail);
      alert("Email versendet");
      vm.sendEmailTo = "";
      $scope.showEmail = !$scope.showEmail;
      }
    }
  ]); // END OF CONTROLLER
