(function scenarioScope(stepsLibrary) {
  'use strict';

  stepsLibrary
    .given('player is logged in', function() {
      stepsLibrary.initializeVM('userAuthVM', this.ctx);
    })
    .given('player has cookies', function() {
      this.ctx.ipCookie('authToken', 'someubercooltoken');
    })
    .when('player logs out', function() {
      sinon.spy(this.ctx.$scope, '$emit');
      this.ctx.$scope.logout();
    })
    .then('player should be logged out', function() {
      expect(this.ctx.userDAO.loggedIn()).to.be.false;
      expect(this.ctx.$scope.$emit).to.have.been.called;
    });
}(window.stepsLibrary));
