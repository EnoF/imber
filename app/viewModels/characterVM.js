(function characterVMVMScope(angular) {
	'use strict';

	var app = angular.module('imber');

	app.controller('characterVM', function characterVM($scope) {
		$scope.character = $scope.character || null;
	});
}(window.angular));
