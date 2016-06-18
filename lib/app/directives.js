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


.directive('eventTitelEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.titel.edit.tmpl.html"
  };
}) // END OF DIRECTVE


.directive('eventHeading', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.heading.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventBandEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.band.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventCommentEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.comment.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventPublicnotesEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.publicnotes.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventTypeEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.type.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventLocation', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.location.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventLocationEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.location.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventDatepickerEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.datepicker.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventTravelpartyEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.travelparty.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventDurationEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.duration.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventFoodEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.food.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventFeeEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.fee.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventState', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.state.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventStateEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.state.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventAgeEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.age.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventLinksEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.links.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventPublishedEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.published.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventPublicEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.public.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventTimes', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.times.tmpl.html"
  };
}) // END OF DIRECTVE
.directive('eventTimesFood', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.times-food.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventTimesGetin', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.times-getin.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventTimesSoundcheck', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.times-soundcheck.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventTimesDoors', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.times-doors.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventTimesEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.times.edit.tmpl.html"
  };
}) // END OF DIRECTVE


.directive('eventPromoterEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.promoter.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('eventMembersEdit', function () {
  return {
    restrict: "E",
    templateUrl: "app/components/event/event.members.edit.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('toolbar', function () {
  return {
    restrict: "E",
    templateUrl: "app/shared/toolbar.tmpl.html"
  };
}) // END OF DIRECTVE

.directive('ngModel', function ($filter) {
  return {
    require: '?ngModel',
    link: function (scope, elem, attr, ngModel) {
      if (!ngModel)
      return;
      if (attr.type !== 'time')
      return;

      ngModel.$formatters.unshift(function (value) {
        return value.replace(/:00\.000$/, '')
      });
    }
  }
}); // END OF DIRECTIVE
