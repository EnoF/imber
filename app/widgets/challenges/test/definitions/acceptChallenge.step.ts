module ImberTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import ChallengesVM = ChallengesVMS.ChallengesVM;
  var expect = chai.expect;

  library
    .given('I go to pending challenge $NUM', (pendingChallengeIndex: string) => {
      ctx.$child = ctx.$element.find('[ng-repeat="challenge in vm.challengesForMe"]:nth-child(' +
        pendingChallengeIndex + ') p').scope();
    })
    .given('I am authorized to accept the challenge', () => {
      ctx.$httpBackend.expect('POST', /\/api\/games\/(.*)\/accept/)
        .respond(200, 'ok');
    })
    .when('I accept the challenge', () => {
      ctx.$child.vm.accept();
      ctx.$httpBackend.flush();
      ctx.$scope.$apply();
    });
}
