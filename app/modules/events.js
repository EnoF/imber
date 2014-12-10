(function events(angular) {
  'use strict';

  var app = angular.module('imber');

  app.factory('events', function eventsFactory() {
    return {
      LOGGEDIN: 'loggedin'
    };
  });
}(window.angular));