module ImberTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import ERRORS = Models.ERRORS;
  var expect = chai.expect;

  library
    .given('I am viewing on a (.*) screen', (size: string) => {
      var mdStub = sinon.stub(ctx.$scope, '$mdMedia');
      var isGtSm = true;
      if (size === 'small') {
        isGtSm = false;
      }
      mdStub.returns(isGtSm);
    })
    .when('I am in (.*) state', (state: string) => {
      ctx.$scope.vm.state = ctx.$scope.vm[state];
      ctx.$scope.$apply();
    })
    .then('I (.*) Login Card', (shouldSee: string) => {
      expect(ctx.$element.find('.login-card').length === 1).to.equal(shouldSee === 'see');
    })
    .then('I (.*) Login Form', (shouldSee: string) => {
      expect(ctx.$element.find('.login-form').length === 1).to.equal(shouldSee === 'see');
    })
    .then('I (.*) Register Card', (shouldSee: string) => {
      expect(ctx.$element.find('.register-card').length === 1).to.equal(shouldSee === 'see');
    })
    .then('I (.*) Register Form', (shouldSee: string) => {
      expect(ctx.$element.find('.register-form').length === 1).to.equal(shouldSee === 'see');
    });
}
