module ImberTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import ERRORS = Models.ERRORS;
  var expect = chai.expect;

  library.given('the credentials are correct', function() {
    ctx.$httpBackend.expect('POST', '/api/login', {
      userName: ctx.$scope.vm.userName,
      password: ctx.$scope.vm.password
    }).respond(200, {
      authToken: 'f1a2k3e4a5u6t7h8',
      user: {
        _id: 'f1a2k3e4i5d6',
        userName: 'EnoF'
      }
    });
  })
  .given('the credentials are incorrect', () => {
    ctx.$httpBackend.expect('POST', '/api/login', {
      userName: ctx.$scope.vm.userName,
      password: ctx.$scope.vm.password
    }).respond(403, ERRORS.UNAUTHORIZED);
  })
  .then('I should be logged in', function() {
    ctx.$httpBackend.flush();
    expect(ctx.session.isLoggedIn()).to.equal(true);
  })
  .then('I should not be logged in', function() {
    ctx.$httpBackend.flush();
    expect(ctx.session.isLoggedIn()).to.equal(false);
  });
}
