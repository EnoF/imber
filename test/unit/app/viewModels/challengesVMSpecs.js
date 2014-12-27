(function challengesVMSpecsScope() {
  'use strict';

  describe('challenges view model specs', function challengesVMSpecs() {
    var testGlobals, $scope, $httpBackend, Game, defaultGames;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _Game_) {
      testGlobals = testSetup.setupControllerTest('challengesVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      Game = _Game_;
      defaultGames = [{
        _id: 'game1',
        challenger: {
          _id: 'id1',
          userName: 'EnoF'
        },
        opponent: {
          _id: 'id2',
          userName: 'Rina'
        }
      }, {
        _id: 'game2',
        challenger: {
          _id: 'id1',
          userName: 'EnoF'
        },
        opponent: {
          _id: 'id2',
          userName: 'Rina'
        }
      }];
    }));

    it('should retrieve all latest challenges from any user', function anyUser() {
      // given
      expect($scope.challenges).to.be.empty;

      // predict
      $httpBackend.expect('GET', '/api/games')
        .respond(200, defaultGames);

      // when
      $scope.load();
      $httpBackend.flush();

      // then
      expect($scope.challenges[0]).to.be.instanceof(Game);
      expect($scope.challenges[0].getId()).to.equal('game1');
      expect($scope.challenges[1]).to.be.instanceof(Game);
      expect($scope.challenges[1].getId()).to.equal('game2');
    });

    it('should retrieve all latest challenges where a user is involved', function involvedUser() {
      // given

      // when

      // then

    });

    it('should retrieve all latest games of a user as challenger', function userAsChallenger() {
      // given

      // when

      // then
    });

    it('should retrieve all latest games of a user as opponent', function userAsOpponent() {
      // given

      // when

      // then

    });
  });
}());
