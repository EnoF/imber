(function scenarioScope(stepsLibrary) {
  'use strict';

  stepsLibrary
    .given('focus is on position $NUM', function(position) {
      position = parseInt(position, 10);
      this.ctx.$scope.focus = position - 1;
    })
    .when('pressing down arrow', function() {
      this.ctx.$scope.focusDown();
    })
    .when('pressing up arrow', function() {
      this.ctx.$scope.focusUp();
    })
    .then('the focus should be on position $NUM', function(expected) {
      expected = parseInt(expected, 10) - 1;
      expect(this.ctx.$scope.focus).to.equal(expected);
    });
}(window.stepsLibrary));
