(function () {
  var app = angular.module('bandcommanderApp', ['ngRoute', 'ngAnimate',
      'ngMaterial', 'cgBusy', "ngCookies", 'ngMessages'
    ])
    .constant('AUTH_EVENTS', {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    })
    .constant('USER_ROLES', {
      all: '*',
      admin: 'admin',
      editor: 'editor',
      member: 'member',
      guest: 'guest'
    })
    .config(function ($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('amber')
        .accentPalette('blue');
    })
    .value('cgBusyDefaults', {
      message: 'Login...',
      backdrop: true,
      delay: 0,
      minDuration: 1000
    });

  /* -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
  CONTROLLERS
  -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! */
  app.controller('MainCtrl', ["$scope", "Page", "USER_ROLES", "AuthService",
    "Session",

    function ($scope, Page, USER_ROLES, AuthService, Session) {
      $scope.Page = Page;
      $scope.currentUser = null;
      $scope.userRoles = USER_ROLES;
      $scope.isAuthorized = AuthService.isAuthorized;
      $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
      };
      $scope.date = new Date();
    }
  ]); // END OF CONTROLLER

  app.controller('ToolbarCtrl', ["$scope", "Toolbar",
    function ($scope, Toolbar) {
      $scope.Toolbar = Toolbar;
      $scope.iconClick = function () {
        if (Toolbar.action() == "back") {
          history.back();
        }
      };
      $scope.iconClickRight = function () {
        if (Toolbar.actionRight() == "Speichern") {
          $scope.submit();
        }
      };
    }
  ]); // END OF CONTROLLER

})(); // END OF WRAPPER
