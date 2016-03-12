angular.module("bandcommanderApp")
  .factory('Page', function PageFactory() {
    var title = 'Startseite';
    return {
      title: function () {
        return title;
      },
      setTitle: function (newTitle) {
        title = newTitle + " | Bandcommander"
      }
    };
  });
