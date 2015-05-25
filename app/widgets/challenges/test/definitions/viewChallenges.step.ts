module ImberTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import ERRORS = Models.ERRORS;
  var expect = chai.expect;

  library
    .given('< Game  >< Challenger  >< Opponent  >< State     >', () => {
      ctx.games = [];
    })
    .given('< Game  >< (.*) >< (.*) >< (.*) >', (challenger: string, opponent: string, state: string) => {
      ctx.games.push({
        _id: 'gameid' + ctx.games.length,
        board: {
          _id: 0,
          x: 5,
          y: 5
        },
        challenger: {
          _id: challenger.extractValue().toFakeId(),
          userName: challenger.extractValue()
        },
        opponent: {
          _id: opponent.extractValue().toFakeId(),
          userName: opponent.extractValue()
        },
        started: state.extractValue() === 'ACCEPTED'
      });
    })
    .given('the server finds challenges', () => {
      ctx.$httpBackend.expect('GET', '/api/games?player=e1n2o3f4')
        .respond(200, ctx.games);
    })
    .then('I see in pending challenges waiting for me $NUM challenge(:s){0,1}', (numberOfChallenges: string) => {
      expect(ctx.$element.find('[ng-repeat="challenge in vm.challengesForMe"]').length)
        .to.equal(numberOfChallenges.toNumber());
    })
    .then('I see in my pending challenges $NUM challenge(:s){0,1}', (numberOfChallenges: string) => {
      expect(ctx.$element.find('[ng-repeat="challenge in vm.myChallenges"]').length)
        .to.equal(numberOfChallenges.toNumber());
    })
    .then('I see in my started challenges $NUM challenge(:s){0,1}', (numberOfChallenges: string) => {
      expect(ctx.$element.find('[ng-repeat="challenge in vm.myStartedChallenges"]').length)
        .to.equal(numberOfChallenges.toNumber());
    })
    .then('I see in the global pending challenges $NUM challenge(:s){0,1}', (numberOfChallenges: string) => {
      expect(ctx.$element.find('[ng-repeat="challenge in vm.globalChallenges"]').length)
        .to.equal(numberOfChallenges.toNumber());
    })
    .then('I see in the global started challenges $NUM challenge(:s){0,1}', (numberOfChallenges: string) => {
      expect(ctx.$element.find('[ng-repeat="challenge in vm.globalStartedChallenges"]').length)
        .to.equal(numberOfChallenges.toNumber());
    });
}
