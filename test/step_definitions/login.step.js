(function scenarioScope(stepsLibrary) {
  'use strict';

  stepsLibrary
    .given('player is on login screen', function(next) {
      stepsLibrary.initializeVM('userAuthVM', this.ctx, next);
    })
    .given('player provides (.*) as (.*)', function(value, model, next) {
      this.ctx.$scope[model.toCamelCase()] = value;
      next();
    })
    .given('the credentials are correct', function(next) {
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
      next();
    })
    .when('player logs in', function(next) {
      this.ctx.$scope.login();
      this.ctx.$httpBackend.flush();
      next();
    })
    .then('player should be logged in', function(next) {
      expect(this.ctx.$scope.loggedIn()).to.be.true;
      expect(this.ctx.ipCookie('authToken')).to.equal(this.ctx.expectedResponse.authToken);
      expect(this.ctx.userDAO.getCurrentUser().getId()).to.equal(this.ctx.expectedResponse.user._id);
      expect(this.ctx.userDAO.getCurrentUser().getUserName()).to.equal(this.ctx.expectedResponse.user.userName);
      next();
    });
}(window.stepsLibrary));
