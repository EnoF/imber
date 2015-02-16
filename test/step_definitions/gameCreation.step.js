(function scenarioScope(stepsLibrary) {
  'use strict';

  stepsLibrary
    .given('I am on a game creation panel', function() {
      stepsLibrary.initializeVM('gameCreationVM', this.ctx);
    })
    .given('the opponent has "(.*)" as (.*)', function(value, key) {
      this.ctx.opponent = this.ctx.opponent || {};
      this.ctx.opponent[key] = value;
    })
    .given('player is logged in as "(.*)"', function(userName) {
      this.ctx.loggedInUser = {
        authToken: 'someubercooltoken',
        user: {
          _id: 'a1b2c3d4e5f6g7h8',
          userName: userName
        }
      };
      // setup a call intercepter
      this.ctx.$httpBackend.when('POST', '/api/login')
        .respond(200, this.ctx.loggedInUser);
      // trigger the login call
      this.ctx.userDAO.login();
      this.ctx.$httpBackend.flush();
    })
    .given('opponent is assigned', function() {
      this.ctx.$scope.opponent = new this.ctx.User({
        _id: 'a1b2c3d4e5f6g7h8',
        userName: 'Rina'
      })
    })
    .given('challenge will be successful', function() {
      sinon.spy(this.ctx.$scope, '$emit');
      this.ctx.$httpBackend.expect('POST', '/api/games', {
        challenger: this.ctx.loggedInUser.user._id,
        opponent: this.ctx.$scope.opponent.getId()
      }).respond(200, 'ok');
    })
    .when('an opponent is assigned', function() {
      this.ctx.event = {
        stopPropagation: sinon.spy()
      };
      this.ctx.$scope.assignOpponent(this.ctx.event, this.ctx.opponent);
    })
    .when('challenge is requested', function() {
      this.ctx.$scope.challenge();
      this.ctx.$httpBackend.flush();
    })
    .then('the event should be stopped', function() {
      expect(this.ctx.event.stopPropagation).to.have.been.called;
    })
    .then('the opponent should be assigned', function() {
      expect(this.ctx.$scope.opponent).to.equal(this.ctx.opponent);
    })
    .then('the parent will be notified the challenge was successful', function() {
      expect(this.ctx.$scope.$emit).to.have.been
        .calledWith(this.ctx.events.CHALLENGED);
    })
    .then('the challenge should be pending', function() {
      expect(this.ctx.$scope.challenged).to.be.true;
    });
}(window.stepsLibrary));
