(function gameVMSpecsScope(sinon) {
  'use strict';

  describe('game view model specs', function gameVMSpecs() {
    var testGlobals, $scope, $httpBackend, Game, Team, Character, characterTypes, events;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _Game_, _Team_, _Character_, _characterTypes_) {
      testGlobals = testSetup.setupControllerTest('gameVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
      Game = _Game_;
      Team = _Team_;
      Character = _Character_;
      characterTypes = _characterTypes_;
    }));

    it('should load the game details', loadGameDetails);

    function loadGameDetails() {
      // given
      $scope.id = 'a1b2c3d4e5f6g7';
      var response = testGlobals.createDefaultGameResponse();

      // predict
      $httpBackend.expect('GET', '/api/games/a1b2c3d4e5f6g7')
        .respond(200, response);

      // when
      $scope.load();
      $httpBackend.flush();

      // then
      expect($scope.game).to.be.instanceof(Game);
      expect($scope.game.getId()).to.equal('gameId1');
      expect($scope.game.getChallenger().getId()).to.equal('userid1');
      expect($scope.game.getChallenger().getUserName()).to.equal('EnoF');
      expect($scope.game.getOpponent().getId()).to.equal('userid2');
      expect($scope.game.getOpponent().getUserName()).to.equal('Rina');
      expect($scope.game.isStarted()).to.equal(
        false);
      return $scope;
    }

    it('should load the characters of a game', function loadCharacters() {
      // given
      var $scope = loadGameDetails();

      // when
      var teamChallenger = $scope.game.getChallengerTeam();

      // then
      expect(teamChallenger).to.be.an.instanceof(Team);
      expect(teamChallenger.get('x0y1')).to.be.an.instanceof(Character);
      var character = teamChallenger.get('x0y1');
      expect(character.getId()).to.equal('charid11');
      expect(character.getName()).to.equal('Soldier');
      expect(character.getType()).to.equal(characterTypes.SOLDIER);
    });

    it('should load a started game', function loadGameDetails() {
      // given
      $scope.id = 'a1b2c3d4e5f6g7';
      var response = testGlobals.createDefaultGameResponse();
      response.started = true;

      // predict
      $httpBackend.expect('GET', '/api/games/a1b2c3d4e5f6g7')
        .respond(200, response);

      // when
      $scope.load();
      $httpBackend.flush();

      // then
      expect($scope.game).to.be.instanceof(Game);
      expect($scope.game.getChallenger().getId()).to.equal('userid1');
      expect($scope.game.getChallenger().getUserName()).to.equal('EnoF');
      expect($scope.game.getOpponent().getId()).to.equal('userid2');
      expect($scope.game.getOpponent().getUserName()).to.equal('Rina');
      expect($scope.game.isStarted()).to.equal(true);
    });

    it('should accept the game', function acceptChallenge() {
      // given
      loadGameDetails();
      expect($scope.game.isStarted()).to.equal(false);
      $scope.$emit = sinon.spy();

      // predict
      $httpBackend.expect('POST', '/api/games/gameId1/accept')
        .respond(200, 'ok');

      // when
      $scope.accept();
      $httpBackend.flush();

      // then
      expect($scope.game.isStarted()).to.equal(true);
      expect($scope.$emit).to.have.been.calledWith(events.ACCEPTED);
    });

    describe('get characters from any team', function getCharacterSpecs() {
      it('should return the character of the challenger', function characterOfChallenger() {
        // given
        loadGameDetails();

        // when
        var character = $scope.getCharacter(0, 1);

        // then
        expect(character).to.be.instanceof(Character);
        expect(character.getX()).to.equal(0);
        expect(character.getY()).to.equal(1);
      });

      it('should return the character of the opponent', function characterOfOppnent() {
        // given
        loadGameDetails();

        // when
        var character = $scope.getCharacter(0, 9);

        // then
        expect(character).to.be.instanceof(Character);
        expect(character.getX()).to.equal(0);
        expect(character.getY()).to.equal(9);
      });

      it('should return null when nothing is found', function nothingFound() {
        // given
        loadGameDetails();

        // when
        var character = $scope.getCharacter(5, 5);

        // then
        expect(character).to.equal(null);
      });
    });
  });
}(window.sinon));
