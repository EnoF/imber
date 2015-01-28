(function scenarioScope(stepsLibrary) {
  'use strict';

  var ctx;

  stepsLibrary
    .given('player is on login screen', function(next) {
      ctx = {};
      stepsLibrary.initializeVM('userAuthVM', ctx, next);
    })
    .given('player provides (.*) as (.*)', function(value, model, next) {
      ctx.$scope[model.toCamelCase()] = value;
      next();
    })
    .given('the credentials are correct', function(next) {
      ctx.expectedResponse = {
        authToken: 'returnedAuthToken',
        user: {
          _id: 'a1b2c3d4e5f6g7',
          userName: ctx.$scope.userName
        }
      };
      ctx.$httpBackend.expect('POST', '/api/login', {
        userName: ctx.$scope.userName,
        password: ctx.$scope.password
      }).respond(200, ctx.expectedResponse);
      next();
    })
    .when('player logs in', function(next) {
      ctx.$scope.login();
      ctx.$httpBackend.flush();
      next();
    })
    .then('player should be logged in', function(next) {
      expect(ctx.$scope.loggedIn()).to.be.true;
      expect(ctx.ipCookie('authToken')).to.equal(ctx.expectedResponse.authToken);
      expect(ctx.userDAO.getCurrentUser().getId()).to.equal(ctx.expectedResponse.user._id);
      expect(ctx.userDAO.getCurrentUser().getUserName()).to.equal(ctx.expectedResponse.user.userName);
      next();
    });
}(window.stepsLibrary));
