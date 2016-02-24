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
        }, 50000);
      }
      else {
        data.status = "😵Something went wrong. Please try again. 🤕";
        data.class = "status-failure"
        $timeout(function () {
          $location.path('/');
        }, 70000);
      }



    }
  ]); // END OF CONTROLLER
