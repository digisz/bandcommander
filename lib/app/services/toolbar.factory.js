angular.module("bandcommanderApp")
.factory('Toolbar',function ToolbarFactory() {
  var action = 'ng-click="Page.setTitle()"';
  var icon = "🤓";
   return {
     action: function() { return action;},
     icon: function() { return icon;},
     setAction: function(newAction) {
       if(newAction == "Menu"){
          icon ="🍔";
     }
     if(newAction == "Back"){
       icon ="⬅️";
   }
    }
   };
});
