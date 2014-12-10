(function events(angular) {
  'use strict';

  var app = angular.module('imber');

  app.factory('events', function eventsFactory() {
    return {
      LOGGED_IN: 'loggedI;n',
      LOGGED_OUT: 'loggedOut'
    };
  });
}(window.angular));