(function () {
  var app = angular.module('bandcommanderApp', ['ngRoute', 'ngAnimate',
    'formly', 'formlyBootstrap'
  ])

  app.run(function (formlyConfig) {
    // NOTE: This next line is highly recommended. Otherwise Chrome's autocomplete will appear over your options!
    formlyConfig.extras.removeChromeAutoComplete = true;
    formlyConfig.setType({
      name: 'async-ui-select',
      extends: 'select',
      templateUrl: 'async-ui-select-type.html'
    });
  });

  /* -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
  CONTROLLERS
  -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! */

  app.controller('HomeController', ["$scope", "$http", "Event",
    "$location",
    function (
      $scope, $http, Event, $location) {
      var controller = this;
      this.events = [];
      Event.all()
        .success(function (data) {
          controller.events = data;
        });
      $scope.showEvent = function (eventID) {
        $location.path('event/' + eventID);
      };

    }
  ]); // END OF CONTROLLER

  app.controller('SingleEventController', ["$scope", "$http",
    '$routeParams',
    'Event',
    function ($scope, $http, $routeParams, Event) {
      var store = this;
      this.event = [];
      Event.one($routeParams.eventID)
        .success(function (data) {
          store.event = data;
        });

      var vm = this;

      vm.model = {
        "name": "hello world"
      };

      vm.fields = [{
        key: 'englishMonarchs',
        type: 'select',
        templateOptions: {
          label: 'Show',
          options: [],
          valueProp: 'name',
          labelProp: 'name',
          required: true,
          placeholder: 'Bitte auswählen'
        },
        controller: /* @ngInject */ function ($scope, Event) {
          $scope.to.loading = Event.all()
            .then(function (response) {
              $scope.to.options = response.data;
              // note, the line above is shorthand for:
              // $scope.options.templateOptions.options = data;
              return response;
            });
        }
      }, {
        key: "name",
        type: "input",
        templateOptions: {
          label: "Veranstaltungsname",
          required: true,
          placeholder: "Openair Frauenfeld..."
        }
      }, {
        key: "band",
        type: "input",
        templateOptions: {
          label: "Band",
          required: true,
          placeholder: "Band"
        }
      }];


    }
  ]); // END OF CONTROLLER

  /* -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
  DIRECTIVES
  -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! */

  app.directive('singleShowSmall', function () {
    return {
      restrict: "E",
      templateUrl: "app/components/home/singleShowSmall.tmpl.html"
    };
  }); // END OF DIRECTVE

  app.directive('footer', function () {
    return {
      restrict: "E",
      templateUrl: "app/shared/footer.tmpl.html"
    };
  }); // END OF DIRECTVE


})(); // END OF WRAPPER
