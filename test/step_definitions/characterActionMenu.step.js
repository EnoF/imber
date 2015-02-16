(function scenarioScope(stepsLibrary) {
  'use strict';

  stepsLibrary
    .given('player has a character available', function() {
      stepsLibrary.initializeVM('characterVM', this.ctx);
    })
    .when('clicking on the character', function() {
      sinon.spy(this.ctx.$scope, '$emit');
      this.ctx.$scope.openActionPanel();
    })
    .then('the action menu should be requested', function() {
      expect(this.ctx.$scope.$emit).to.have.been
        .calledWith(this.ctx.events.REQUEST_OPEN_ACTIONS,
          this.ctx.$scope.character);
    });
}(window.stepsLibrary));
