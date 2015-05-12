module ImberTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;

  library.given('the credentials are correct', function() {
    ctx.$httpBackend.expect('GET', '/api/login', {
      userName: ctx.$scope.vm.userName,
      password: ctx.$scope.vm.password
    }).respond(200, {
      authToken: '',
      user: {
        _id: 'f1a2k3e4i5d6',
        userName: 'EnoF'
      }
    });
  })
  .then('I should be logged in', function() {
    ctx.$httpBackend.flush();
  });
}
