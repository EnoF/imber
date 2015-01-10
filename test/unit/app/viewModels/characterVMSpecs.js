(function characterVMSpecs(sinon) {
	'use strict';

	describe('characterVM specs', function characterVMSpecs() {
		var testGlobals, $scope, $q, $httpBackend, defaultCharacter, events;

		beforeEach(module('imber-test'));

		beforeEach(inject(function setupTest(testSetup, _$q_, Character) {
			testGlobals = testSetup.setupControllerTest('characterVM');
			$scope = testGlobals.$scope;
			$httpBackend = testGlobals.$httpBackend;
			$q = _$q_;
			defaultCharacter = new Character(testGlobals.createDefaultCharacterResponse());
			events = testGlobals.events;
		}));

		it('request to open action panel', function openActionPanel() {
			// given
			$scope.character = defaultCharacter;
			sinon.spy($scope, '$emit');

			// when
			$scope.openActionPanel();

			// then
			expect($scope.$emit).to.have.been.calledWith(events.REQUEST_OPEN_ACTIONS, $scope.character);
		});
	});
}(window.sinon));
