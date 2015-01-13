(function actionPanelWidgetSpecsScope(angular) {
	'use strict';

	describe('<action-panel> specs', function actionPanelWidgetSpecs() {
		var testGlobals, parentScope, defaultCharacter;

		beforeEach(module('imber-test'));

		beforeEach(inject(function setupTest(testSetup, Character) {
			testGlobals = testSetup.setupDirectiveTest();
			parentScope = testGlobals.parentScope;
			defaultCharacter = new Character(testGlobals.createDefaultCharacterResponse());
		}));

		it('should use the provided character model', function providedCharacterModel() {
			// given
			parentScope.character = defaultCharacter;
			var directive = angular.element('<action-panel character="character"></action-panel>');

			// when
			var $scope = testGlobals.initializeDirective(parentScope, directive);

			// then
			expect($scope.character).to.equal(parentScope.character);
		});
	});
}(window.angular));
