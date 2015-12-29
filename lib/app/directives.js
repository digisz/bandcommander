/* -!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!
DIRECTIVES
-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! */

angular.module("bandcommanderApp")

.directive('singleShowSmall', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/home/singleShowSmall.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('addShow', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/home/addshow.tmpl.html",
    scope: {
      showEvent: "=",
    }
  };
}) // END OF DIRECTVE


.directive('footer', function () {
  return {
    restrict: "E",
    templateUrl: "app/shared/footer.tmpl.html"
  };
}) // END OF DIRECTVE
