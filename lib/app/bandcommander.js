(function () {
  var app = angular.module('bandcommanderApp', ['ngRoute', 'ngAnimate',
    'ngMaterial'
  ])

  /* -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
  CONTROLLERS
  -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! */
  app.controller('MainCtrl', ["$scope", "Page",
    function ($scope, Page) {
      $scope.Page = Page;
    }
  ]); // END OF CONTROLLER

})(); // END OF WRAPPER
