(function events(angular) {
  'use strict';

  var app = angular.module('imber');

  app.factory('events', function eventsFactory() {
    return {
      LOGGED_IN: 'loggedIn',
      LOGGED_OUT: 'loggedOut',
      USER_NOT_FOUND: 'userNotFound',
      USER_SELECTED: 'userSelected'
    };
  });
}(window.angular));
