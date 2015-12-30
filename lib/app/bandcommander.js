(function () {
  var app = angular.module('bandcommanderApp', ['ngRoute', 'ngAnimate',
    'ngMaterial'
  ])


  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('orange');
  });

  /* -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
  CONTROLLERS
  -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! */
  app.controller('MainCtrl', ["$scope", "Page",
    function ($scope, Page) {
      $scope.Page = Page;
    }
  ]); // END OF CONTROLLER

})(); // END OF WRAPPER
