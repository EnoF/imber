(function actionPanelDirectiveScope(angular) {
	'use strict';

	var app = angular.module('imber');

	app.directive('actionPanel', function actionPanelDirective() {
		return {
			restrict: 'E',
			scope: {
				character: '=character'
			},
			controller: '',
			templateUrl: 'actionPanel'
		};
	});
}(window.angular));
