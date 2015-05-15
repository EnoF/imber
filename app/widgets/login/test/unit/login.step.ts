module ImberTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  var expect = chai.expect;

  library.given('the credentials are correct', function() {
    ctx.$httpBackend.expect('GET', '/api/login', {
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
  .then('I should be logged in', function() {
    ctx.$httpBackend.flush();
    expect(ctx.session.isLoggedIn()).to.equal(true);
  });
}
