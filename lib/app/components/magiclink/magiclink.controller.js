angular.module("bandcommanderApp")
  .controller('MagiclinkController', [ "Page", "$rootScope", "$scope", "$location",

    function ( Page, $rootScope, $scope, $location) {

      $scope.wrong = false;
      Page.setTitle("Login");


    }
  ]); // END OF CONTROLLER
