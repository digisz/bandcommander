angular.module("bandcommanderApp")
  .controller('MagiclinkController', [ "Page", "$rootScope", "$scope", "$location","AuthService",

    function ( Page, $rootScope, $scope, $location,AuthService) {
      $scope.credentials = {
        name: ''
      };
      $scope.sent = false;
      Page.setTitle("SMS Login");

      $scope.request = function (credentials) {
        $scope.waiting = AuthService.sms(credentials)
          .then(function () {
            $scope.sent = true;
          }
      )};

    }
  ]); // END OF CONTROLLER
