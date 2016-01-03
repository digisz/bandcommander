(function () {
  'use strict';
  angular
  .module('bandcommanderApp')
  .controller('CustomInputDemoCtrl', ["User","AuthService", function DemoCtrl (User,AuthService,$timeout, $q) {
    var self = this;
    self.readonly = !AuthService.isAuthorized("admin");
    User.all().then(function(data){
      self.members = data;
      self.readonly = false;
      self.selectedItem = null;
      self.searchText = null;
      self.querySearch = querySearch;
      self.members = loadMembers();
      self.selectedMembers = [];
      self.transformChip = transformChip;
    });


    /**
    * Return the proper object when the append is called.
    */
    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }

      // Otherwise, create a new one
      return { name: chip, type: 'new' }
    }

    /**
    * Search for Members.
    */
    function querySearch (query) {
      var results = query ? self.members.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
    * Create filter function for a query string
    */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(member) {
        return (member._lowername.indexOf(lowercaseQuery) === 0) ||
        (member._lowertype.indexOf(lowercaseQuery) === 0);
      };

    }

    function loadMembers() {
    /*  var members = [
        {
          nick:"Digi",
          name:"digi",
          displayName:"Pascal Reichmuth"
        },
        {
          nick:"Flap",
          name:"flap",
          displayName:"Benedikt Bisig"
        },
        {
          nick:"Gsichti",
          name:"chandro",
          displayName:"Nicolas Bisig"
        },
        {
          nick:"Bandit",
          name:"bandit",
          displayName:"Patrick Mitidieri"
        },
        {
          nick:"C.mEE",
          name:"cmee",
          displayName:"Simon Kessler"
        },
        {
          nick:"Young Merch",
          name:"youngmerch",
          displayName:"Fabian Reichmuth"
        }
      ];
*/
      var members = self.members;
      return members.map(function (mem) {
        mem._lowername = mem.name.toLowerCase();
        mem._lowertype = mem.displayName.toLowerCase();
        return mem;
      });
    }
  }]);

})();
