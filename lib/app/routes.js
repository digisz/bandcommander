/* -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
ROUTER
-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! */
angular.module('bandcommanderApp')
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.

  when('/', {
      templateUrl: 'views/home.view.html',
      controller: 'HomeController'
    })
    .
  when('/event/:eventID', {
    templateUrl: 'views/event.view.html',
    controller: 'SingleEventController'
  })
  .
  otherwise({redirectTo:"/"})
  ;

}]);
