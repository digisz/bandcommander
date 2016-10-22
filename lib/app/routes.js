/* -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
ROUTER
-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! */
angular.module('bandcommanderApp')
  .config(['$routeProvider', '$locationProvider', 'AUTH_EVENTS', 'USER_ROLES',
    function (
      $routeProvider,
      $locationProvider, AUTH_EVENTS, USER_ROLES) {

      $routeProvider.

      when('/', {
          templateUrl: 'views/home.view.html',
          data: {
            authorizedRoles: [USER_ROLES.all]
          },
          paramExample: 'current'
        })
        .
        when('/archive', {
            templateUrl: 'views/home.view.html',
            data: {
              authorizedRoles: [USER_ROLES.all]
            },
            paramExample: 'archive'
          })
          .
      when('/event/:eventID', {
          templateUrl: 'views/event.view.html',
          data: {
            authorizedRoles: [USER_ROLES.all]
          }
        })
        .
      when('/event/edit/:eventID', {
          templateUrl: 'views/event.edit.view.html',
          data: {
            authorizedRoles: [USER_ROLES.admin]
          }
        })
        .
      when('/status/:statusType', {
          templateUrl: 'views/status.view.html',
          data: {
            authorizedRoles: [USER_ROLES.all]
          }
        })
        .
      when('/login', {
          templateUrl: 'views/login.view.html',
          data: {
            authorizedRoles: [USER_ROLES.all]
          }
        })
        .
        when('/magiclink', {
            templateUrl: 'views/magiclink.view.html',
            data: {
              authorizedRoles: [USER_ROLES.all]
            }
          })
          .
          when('/magiclink/:user/:token', {
              templateUrl: 'views/magiclink-redirect.view.html',
              data: {
                authorizedRoles: [USER_ROLES.all]
              }
            })
            .
      otherwise({
        redirectTo: "/"
      });

      /* MAKES PRETTY LINKS, NEEDS A HTACCESS REWRITE
      https://scotch.io/quick-tips/pretty-urls-in-angularjs-removing-the-hashtag
          // use the HTML5 History API
          $locationProvider.html5Mode(true);
      */
    }
  ]);
