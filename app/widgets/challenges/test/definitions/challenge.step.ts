module ImberTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import ERRORS = Models.ERRORS;
  import IGame = Models.IGame;
  import User = Models.User;
  import ChallengesVM = ChallengesVMS.ChallengesVM;
  var expect = chai.expect;

  library
    .given('< Player >< UserName(.*)>', () => ctx.users = [])
    .given('< Player >< (.*) >', (userName: string) => {
      ctx.users.push({
        _id: userName.extractValue().toFakeId(),
        userName: userName.extractValue()
      });
    })
    .given('I am creating a new challenge', () => {
      ctx.$scope.vm.state = ctx.$scope.vm.CREATION;
    })
    .given('my opponent has id "(.*)"', (id: string) => {
      ctx.$scope.vm.opponent = new User({
        _id: id,
        userName: 'Banana'
      });
    })
    .given('I search for "(.*)"', (name: string) => {
      var vm: ChallengesVM = ctx.$scope.vm;
      vm.search(name);
    })
    .given('the opponent is found', () => {
      var game: IGame = {
        _id: 'c1r2e3a4t5e6d7'
      };
      ctx.$httpBackend.expect('POST', '/api/games', {
        challenger: 'E1n2o3F4',
        opponent: 'b1a2n3a4n5a6'
      }).respond(200, game);
    })
    .given('the server finds players', () => {
      ctx.$httpBackend.expect('GET', '/api/user?search=ban')
        .respond(200, ctx.users);
    })
    .then('I should see the challenge in the challenges widget', () => {
      var vm: ChallengesVM = ctx.$scope.vm;
      expect(vm.state).to.equal(ctx.$scope.vm.VIEW);
      expect(vm.myChallenges[0]).to.include({
        _id: 'c1r2e3a4t5e6d7'
      });
    })
    .then('I should see a list of players', () => null);
}
