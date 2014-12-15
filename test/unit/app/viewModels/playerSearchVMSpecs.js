(function playerSearchVMSpecsScope() {
  'use strict';

  describe('playerSearchVM specs', function playerSearchVMSpecs() {
    var $scope, testGlobals, $httpBackend;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup) {
      testGlobals = testSetup.setupControllerTest('playerSearchVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
    }));

    it('should search for a player', function searchPlayer() {
      // given
      var searchCriteria = 'ban';

      // predict
      $httpBackend.expect('GET', '/user?search=' + searchCriteria)
        .respond(200, ['banana', 'banana king', 'ban hammer']);

      // when
      var promise = $scope.searchPlayer(searchCriteria);
      $httpBackend.flush();

      // then
      promise.then(function expectList(list) {
        expect(list).to.include('banana');
        expect(list).to.include('banana king');
        expect(list).to.include('ban hammer');
      });
    });

    it('should provide the selected player model', function selectedPlayerModel() {
      // given

      // when

      // then

    });
  });
}());
