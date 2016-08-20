angular.module("bandcommanderApp")
  .controller('MagiclinkController', [ "Page", "$rootScope", "$scope", "$location","AuthService",

    function ( Page, $rootScope, $scope, $location,AuthService) {

      $scope.wrong = false;
      Page.setTitle("SMS Login");

      $scope.request = function (credentials) {
        $scope.waiting = AuthService.sms(credentials)
          .then(function () {
            alert("SMS gesendet");
          }
      )};

    }
  ]); // END OF CONTROLLER
