/* -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
ROUTER
-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! */
angular.module('bandcommanderApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.

    when('/', {
        templateUrl: 'views/home.view.html',
      })
      .
    when('/event/:eventID', {
        templateUrl: 'views/event.view.html'
      })
      .
    otherwise({
      redirectTo: "/"
    });

  }]);
