(function characterWidgetSpecsScope(angular) {
	'use strict';

	describe('<character> specs', function characterWidgetSpecs() {
		var testGlobals, parentScope, defaultCharacter, defaultCharacterResponse, $httpBackend, events;

		beforeEach(module('imber-test'));

		beforeEach(inject(function setupTest(testSetup, Character) {
			testGlobals = testSetup.setupDirectiveTest();
			testGlobals.loginDefaultUser();
			parentScope = testGlobals.parentScope;
			$httpBackend = testGlobals.$httpBackend;
			defaultCharacterResponse = testGlobals.createDefaultCharacterResponse();
			defaultCharacter = new Character(defaultCharacterResponse);
			events = testGlobals.events;
		}));

		it('should use the provided character model', function providedModel() {
			// given
			parentScope.soldier = defaultCharacter;
			var directive = angular.element('<character character="soldier"></character>');

			// when
			var $scope = testGlobals.initializeDirective(parentScope, directive);

			// then
			expect($scope.character).not.to.equal(null);
			expect($scope.character).to.equal(parentScope.soldier);
		});
	});
}(window.angular));
