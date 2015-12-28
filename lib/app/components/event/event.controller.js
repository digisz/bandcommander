angular.module("bandcommanderApp")
.controller('SingleEventController', ["$scope", "$http",
  '$routeParams',
  'Event',
  function ($scope, $http, $routeParams, Event) {

    var vm = this;
    $scope.onSubmit = function(){
      alert("hey");
      Event.update(vm.model);
    };

    this.model = [];
    Event.one($routeParams.eventID)
      .success(function (data) {
        vm.model = data;
      });
/*-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
ALL FORM FIELDS FOR SHOWS
-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!*/
    vm.fields = [
      {
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
    },
    {
      key: "titel",
      type: "input",
      templateOptions: {
        label: "Veranstaltungsname",
        required: false,
        placeholder: "Openair Frauenfeld..."
      }
    },
    {
      key: "type",
      type: "select",
      templateOptions: {
        label: "Event-Typ",
        required: true,
        placeholder: "Event-Typ",
        options:[
          {
            name: 'Konzert',
            value: 'konzert'
          },
          {
            name: 'TV Show',
            value: 'tv'
          }
          ,
          {
            name: 'Radio Interview',
            value: 'radio'
          }
          ,
          {
            name: 'Bandprobe',
            value: 'probe'
          },
          {
            name: 'Anderer Termin',
            value: 'other'
          }
        ]
      }
    },
    {
      key: "date",
      type: "input",
      templateOptions: {
        label: "Datum",
        type:"input",
        required: true,
        placeholder: ""
      }
    },{
      key: "duration",
      type: "input",
      templateOptions: {
        type:"number",
        label: "Dauer",
        required: false,
        placeholder: "Dauer in Minuten"
      }
    },{
      key: "location",
      type: "input",
      templateOptions: {
        label: "Lokalität",
        required: false,
        placeholder: "Salzhaus Winterthur"
      }
    },{
      key: "address",
      type: "input",
      templateOptions: {
        label: "Adresse",
        required: false,
        placeholder: ""
      }
    },{
      key: "PLZ",
      type: "input",
      templateOptions: {
        label: "PLZ",
        required: false,
        placeholder: ""
      }
    },{
      key: "place",
      type: "input",
      templateOptions: {
        label: "Ortschaft",
        required: false,
        placeholder: "Winterthur"
      }
    },{
      key: "band",
      type: "select",
      templateOptions: {
        label: "Band",
        required: true,
        options:[
          {
            name: 'Möchtegang',
            value: 'moechtegang'
          },
          {
            name: 'Fratelli-B',
            value: 'fratellib'
          }
          ,
          {
            name: 'C.mEE',
            value: 'cmee'
          }
          ,
          {
            name: 'Phumaso & Smack',
            value: 'phumasoSmack'
          },
          {
            name: 'Hedgehog',
            value: 'hedgehog'
          }
        ]
      }
    },{
      key: "travelparty",
      type: "input",
      templateOptions: {
        type:"number",
        label: "Travelparty",
        required: false,
        placeholder: ""
      }
    },{
      key: "food",
      type: "select",
      templateOptions: {
        label: "Essen",
        required: false,
        options:[
          {
            name: 'Ja',
            value: 'Yes'
          },
          {
            name: 'Nein',
            value: 'No'
          }
          ,
          {
            name: 'Unklar',
            value: 'Unknown'
          }
        ]

    }
  }
  ];


  }
]); // END OF CONTROLLER
