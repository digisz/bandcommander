(function () {
  var app = angular.module('bandcommanderApp', ['ngRoute', 'ngAnimate',
      'ngMaterial', 'ngCookies'
    ])
    .run(function ($rootScope, $cookies) {
      $cookies.put('jwt', 'probablyAJWT');
      $rootScope.jwt = $cookies.get('jwt');
      console.log($rootScope.jwt)

      $rootScope.jwt =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjdkMTk2MGU1NzgzNDQ2NzE4NGNhZDEiLCJuYW1lIjoicGFzY2FsIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImFkbWluIjp0cnVlLCJfX3YiOjB9.rpAx634ODPi4hK2DfYJgS_nIS_hJM012IVhYjhjZDpM';
    })

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

  app.controller('Toolbar', ["$scope", "Toolbar",
    function ($scope, Toolbar) {
      $scope.Toolbar = Toolbar;
    }
  ]); // END OF CONTROLLER

})(); // END OF WRAPPER
