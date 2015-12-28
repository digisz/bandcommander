angular.module("bandcommanderApp")
  .controller('SingleEventController', ["$scope", "$http",
    '$routeParams',
    'Event', 'Page',

    function ($scope, $http, $routeParams, Event, Page) {
      var vm = this;
      this.model = []; // empty model, just in case

      if ($routeParams.eventID != "new") {
        $scope.onSubmit = function () {
          Event.update(vm.model);
        };
        // get data
        Event.one($routeParams.eventID)
          .success(function (data) {
            vm.model = data;
            Page.setTitle(vm.model.titel);
          });
      }
      else {
        Page.setTitle("Neuer Event");
        $scope.onSubmit = function () {
          Event.create(vm.model);
        };
      }
      /*-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
      ALL FORM FIELDS FOR SHOWS
      -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!*/
      vm.fields = [{
        key: 'guestlist',
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
        key: "titel",
        type: "input",
        templateOptions: {
          label: "Veranstaltungsname",
          required: false,
          placeholder: "Openair Frauenfeld..."
        }
      }, {
        key: "type",
        type: "select",
        templateOptions: {
          label: "Event-Typ",
          required: true,
          placeholder: "Event-Typ",
          options: [{
            name: 'Konzert',
            value: 'konzert'
          }, {
            name: 'TV Show',
            value: 'tv'
          }, {
            name: 'Radio Interview',
            value: 'radio'
          }, {
            name: 'Bandprobe',
            value: 'probe'
          }, {
            name: 'Anderer Termin',
            value: 'other'
          }]
        }
      }, {
        key: "date",
        type: "input",
        templateOptions: {
          label: "Datum",
          type: "input",
          required: true,
          placeholder: ""
        }
      }, {
        key: "duration",
        type: "input",
        templateOptions: {
          type: "number",
          label: "Dauer",
          required: false,
          placeholder: "Dauer in Minuten"
        }
      }, {
        key: "location",
        type: "input",
        templateOptions: {
          label: "Lokalität",
          required: false,
          placeholder: "Salzhaus Winterthur"
        }
      }, {
        key: "address",
        type: "input",
        templateOptions: {
          label: "Adresse",
          required: false,
          placeholder: ""
        }
      }, {
        key: "plz",
        type: "input",
        templateOptions: {
          label: "PLZ",
          required: false,
          placeholder: ""
        }
      }, {
        key: "place",
        type: "input",
        templateOptions: {
          label: "Ortschaft",
          required: false,
          placeholder: "Winterthur"
        }
      }, {
        key: "band",
        type: "select",
        templateOptions: {
          label: "Band",
          required: true,
          options: [{
            name: 'Möchtegang',
            value: 'moechtegang'
          }, {
            name: 'Fratelli-B',
            value: 'fratellib'
          }, {
            name: 'C.mEE',
            value: 'cmee'
          }, {
            name: 'Phumaso & Smack',
            value: 'phumasoSmack'
          }, {
            name: 'Hedgehog',
            value: 'hedgehog'
          }]
        }
      }, {
        key: "travelparty",
        type: "input",
        templateOptions: {
          type: "number",
          label: "Travelparty",
          required: false,
          placeholder: ""
        }
      }, {
        key: "food",
        type: "select",
        templateOptions: {
          label: "Essen",
          required: false,
          options: [{
            name: 'Ja',
            value: 'Yes'
          }, {
            name: 'Nein',
            value: 'No'
          }, {
            name: 'Unklar',
            value: 'Unknown'
          }]

        }
      }, {
        key: "age",
        type: "input",
        templateOptions: {
          type: "number",
          label: "Mindestalter",
          required: false,
          placeholder: ""
        }
      }, {
        key: "state",
        type: "input",
        templateOptions: {
          type: "text",
          label: "Vertragsstatus",
          required: false,
          placeholder: ""
        }
      }, {
        key: "showtime",
        type: "input",
        templateOptions: {
          type: "date",
          label: "Showtime",
          required: false,
          placeholder: ""
        }
      }, {
        key: "promoter",
        type: "input",
        templateOptions: {
          type: "text",
          label: "Veranstalter",
          required: false,
          placeholder: ""
        }
      }, {
        key: "fee",
        type: "input",
        templateOptions: {
          type: "number",
          label: "Gage",
          required: false,
          placeholder: ""
        }
      }, {
        key: "guestlist",
        type: "input",
        templateOptions: {
          type: "number",
          label: "Travelparty",
          required: false,
          placeholder: ""
        }
      }, {
        "type": "checkbox",
        "key": "published",
        "templateOptions": {
          "label": "Veröffentlichen"
        }
      }];


    }
  ]); // END OF CONTROLLER
