(function scenarioScope(stepsLibrary) {
  'use strict';

  stepsLibrary
    .given('player is on login screen', function() {
      stepsLibrary.initializeVM('userAuthVM', this.ctx);
    })
    .given('player provides "(.*)" as (.*)', function(value, model) {
      this.ctx.$scope[model.toCamelCase()] = value || null;
      console.log(this.ctx.$scope[model.toCamelCase()])
    })
    .given('the credentials are correct', function() {
      this.ctx.expectedResponse = {
        authToken: 'returnedAuthToken',
        user: {
          _id: 'a1b2c3d4e5f6g7',
          userName: this.ctx.$scope.userName
        }
      };
      this.ctx.$httpBackend.expect('POST', '/api/login', {
        userName: this.ctx.$scope.userName,
        password: this.ctx.$scope.password
      }).respond(200, this.ctx.expectedResponse);
    })
    .when('player logs in', function() {
      this.ctx.$scope.login();
      this.ctx.$httpBackend.flush();
    })
    .when('player attempts to log in', function() {
      sinon.spy(this.ctx.userDAO, 'login');
      this.ctx.$scope.login();
    })
    .then('player should be logged in', function() {
      expect(this.ctx.$scope.loggedIn()).to.be.true;
      expect(this.ctx.ipCookie('authToken')).to.equal(this.ctx.expectedResponse.authToken);
      expect(this.ctx.userDAO.getCurrentUser().getId()).to.equal(this.ctx.expectedResponse.user._id);
      expect(this.ctx.userDAO.getCurrentUser().getUserName()).to.equal(this.ctx.expectedResponse.user.userName);
    })
    .then('player should not be logged in', function() {
      expect(this.ctx.userDAO.login).not.to.have.been.called;
    });
}(window.stepsLibrary));
