module ImberTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import ERRORS = Models.ERRORS;
  var expect = chai.expect;

  library
    .given('I have $NUM Games in "(.*)" state', (numberOfGames: string, state: string) => {
      var amountOfGames = parseInt(numberOfGames, 10);
      for (var i = 0; i < amountOfGames; i++) {
        ctx.games.push({
          board: {
            _id: 1,
            x: 5,
            y: 5
          },
          challenger: {
            _id: 'u1s2e3r4o5n6e7',
            userName: 'EnoF'
          },
          opponent: {
            _id: 'u1s2e3r4t5w6o6',
            userName: 'Rina'
          },
          started: state === 'ACCEPTED'
        });
      }
    })
    .given('the server finds challenges', () => {
      ctx.$httpBackend.expect('GET', '/api/games?player=p1l2a3y4e5r6')
        .respond(200, ctx.games);
    })
    .then('I see $NUM challenges in "(.*)"', (numberOfGames: string, state: string) => {
      var amountOfGames = parseInt(numberOfGames, 10);
      var stateClass;
      if (state === 'ACCEPTED') {
        stateClass = '.mdi-navigation-check';
      } else {
        stateClass = '.mdi-action-schedule';
      }
      expect(ctx.$element.find('challenge-item[challenge] ' + stateClass).length).to.equal(amountOfGames);
    });
}
