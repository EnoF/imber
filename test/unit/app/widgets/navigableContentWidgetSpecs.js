(function navigableContentWidgetSpecsScope(angular) {
	'use strict';

	describe('<navigable-content> specs', function navigableContentWidgetSpecs() {
		var testGlobals, parentScope, events, $location;

		beforeEach(module('imber-test'));

		beforeEach(inject(function setupTest(testSetup, _$location_, ipCookie) {
			testGlobals = testSetup.setupDirectiveTest();
			parentScope = testGlobals.parentScope;
			events = testGlobals.events;
			$location = _$location_;
		}));

		it('should navigate to the games with provided id', function navigateToGames() {
			// given
			var id = 'gameId1';
			sinon.spy($location, 'url');
			var directive = angular.element('<navigable-content></navigable-content>');
			var $scope = testGlobals.initializeDirective(parentScope, directive);

			// when
			$scope.$$childHead.$emit(events.REQUEST_GAME, id);

			// then
			expect($location.url).to.have.been.calledWith('/games?gameId=' + id);
		});

		it('should open action panel for a character', function openActionPanelForCharacter() {
			// given
			var directive = angular.element('<navigable-content></navigable-content>');
			var $scope = testGlobals.initializeDirective(parentScope, directive);
			var mockCharacter = sinon.spy();

			// when
			$scope.$$childHead.$emit(events.REQUEST_OPEN_ACTIONS, mockCharacter);

			// then
			expect($scope.character).to.equal(mockCharacter);
		});
	});
}(window.angular));
