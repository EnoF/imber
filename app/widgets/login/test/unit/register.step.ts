module ImberTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import ERRORS = Models.ERRORS;
  var expect = chai.expect;

  library
    .given('the registration will be successful', () => {
      var vm = ctx.$scope.vm;
      ctx.$httpBackend.expect('POST', '/api/user', {
        email: vm.email,
        userName: vm.userName,
        password: vm.password
      }).respond(200, {
        authToken: 'f1a2k3e4a5u6t7h8',
        user: {
          _id: 'f1a2k3e4i5d6',
          userName: 'EnoF'
        }
      });
    });
}
