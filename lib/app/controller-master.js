angular.module("bandcommanderApp")
  .controller('HomeController', ["$scope", "$http", "Event",
    "$location", "Page", "Toolbar",

    function (
      $scope, $http, Event, $location, Page, Toolbar) {
      var controller = this;
      this.events = [];
      Page.setTitle("Startseite");
      Toolbar.setAction("Menu");
      // TODO check for errors
      Event.all()
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

(function () {
  'use strict';
  angular
    .module('bandcommanderApp')
    .controller('CustomInputDemoCtrl', ["User", "AuthService", function DemoCtrl(
      User, AuthService, $timeout, $q) {
      var self = this;
      self.readonly = !AuthService.isAuthorized("admin");
      User.all()
        .then(function (data) {
          self.members = data;
          self.readonly = false;
          self.selectedItem = null;
          self.searchText = null;
          self.querySearch = querySearch;
          self.members = loadMembers();
          self.selectedMembers = [];
          self.transformChip = transformChip;
        });


      /**
       * Return the proper object when the append is called.
       */
      function transformChip(chip) {
        // If it is an object, it's already a known chip
        if (angular.isObject(chip)) {
          return chip;
        }

        // Otherwise, create a new one
        return {
          name: chip,
          type: 'new'
        }
      }

      /**
       * Search for Members.
       */
      function querySearch(query) {
        var results = query ? self.members.filter(createFilterFor(query)) : [];
        return results;
      }

      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(member) {
          return (member.name.indexOf(lowercaseQuery) === 0) ||
            (member.displayName.indexOf(lowercaseQuery) === 0);
        };

      }

      function loadMembers() {
        var members = self.members;
        return members;
      }
    }]);

})();

angular.module("bandcommanderApp")
  .controller('LoginController', ["Event", "Page", "$rootScope", "$scope",
    "AUTH_EVENTS", "AuthService", "$location",

    function (Event, Page, $rootScope, $scope, AUTH_EVENTS, AuthService,
      $location) {
      $scope.credentials = {
        name: '',
        password: '',
        type:'password'
      };
      $scope.wrong = false;
      Page.setTitle("Login");
      $scope.login = function (credentials) {
        $scope.waiting = AuthService.login(credentials)
          .then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.setCurrentUser(user);
            $location.path("/");
          }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          });
      };
      $rootScope.$on(AUTH_EVENTS.loginFailed, function () {
        $scope.wrong = true;
        $scope.credentials = {
          name: '',
          password: ''
        };
      })

    }
  ]); // END OF CONTROLLER

angular.module("bandcommanderApp")
  .controller('StatusController', ["$scope",
    '$routeParams', 'Page', 'Toolbar', "$location", "$timeout",

    function ($scope, $routeParams, Page, Toolbar,
      $location, $timeout) {
      var data = this;
      Toolbar.setAction("Burger");

      // define save function
      if ($routeParams.statusType == "success") {
        data.status = "👊 Look at this awesome new data! 💪";
        data.class = "status-success"
        $timeout(function () {
          $location.path('/');
        }, 5000);
      }
      else {
        data.status = "😵Something went wrong. Please try again. 🤕";
        data.class = "status-failure"
        $timeout(function () {
          $location.path('/');
        }, 5000);
      }



    }
  ]); // END OF CONTROLLER

angular.module("bandcommanderApp")
  .controller('MagiclinkRedirectController', ["Page", "$rootScope", "$scope",
    "AUTH_EVENTS", "AuthService", "$location","$routeParams",

    function (Page, $rootScope, $scope, AUTH_EVENTS, AuthService,
      $location,$routeParams) {
      var credentials = {
        name: $routeParams.user,
        password: $routeParams.token,
        type:'magiclink'
      };
      $scope.wrong = false;
      Page.setTitle("Login");
      AuthService.login(credentials)
          .then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.setCurrentUser(user);
            $location.path("/");
          }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          });

    }
  ]); // END OF CONTROLLER

angular.module("bandcommanderApp")
  .controller('MagiclinkController', [ "Page", "$rootScope", "$scope", "$location",

    function ( Page, $rootScope, $scope, $location) {

      $scope.wrong = false;
      Page.setTitle("Login");


    }
  ]); // END OF CONTROLLER
