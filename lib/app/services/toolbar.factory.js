angular.module("bandcommanderApp")
  .factory('Toolbar', function ToolbarFactory() {
    var action = '';
    var icon = "🤓";
    return {
      action: function () {
        return action;
      },
      icon: function () {
        return icon;
      },
      setAction: function (newAction) {
        if (newAction == "Menu") {
          icon = "🤖";
          action = "";
        }
        if (newAction == "Back") {
          icon = "⬅️";
          action = 'back';
        }
      }
    };
  });
