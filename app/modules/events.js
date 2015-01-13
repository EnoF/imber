(function events(angular) {
	'use strict';

	var app = angular.module('imber');

	app.factory('events', function eventsFactory() {
		return {
			ACCEPTED: 'accepted',
			CHALLENGED: 'challenged',
			LOGGED_IN: 'loggedIn',
			LOGGED_OUT: 'loggedOut',
			REQUEST_GAME: 'requestGame',
			REQUEST_OPEN_ACTIONS: 'requestOpenActions',
			USER_NOT_FOUND: 'userNotFound',
			USER_SELECTED: 'userSelected'
		};
	});
}(window.angular));
