(function scenarioScope(stepsLibrary) {
  'use strict';

  stepsLibrary
    .given('player is on an auto complete field', function() {
      stepsLibrary.initializeVM('autoCompleteVM', this.ctx);
      this.ctx.$scope.options = [];
    })
    .given('there is an option "(.*)"', function(option) {
      this.ctx.$scope.options.push(option);
    })
    .given('there is a load function provided', function() {
      var deferred = this.ctx.$q.defer();
      this.ctx.$scope.loadFunction = function loadFunction() {
        deferred.resolve(['hello', 'hellow', 'helelel']);
        return deferred.promise;
      };
    })
    .given('the minimum threshold is $NUM', function(threshold) {
      threshold = parseInt(threshold, 10);
      this.ctx.$scope.minSearch = threshold;
    })
    .when('the player types "(.*)"', function(input) {
      this.ctx.$scope.value = input;
      this.ctx.$scope.suggest();
    })
    .when('the options will be loaded', function() {
      this.ctx.$scope.load();
      this.ctx.$scope.$apply();
    })
    .when('the delay has passed', function() {
      this.ctx.$timeout.flush();
    })
    .then('the option "(.*)" is suggested', function(expected) {
      expect(this.ctx.$scope.suggestions).to.include(expected);
    })
    .then('the option "(.*)" is not suggested', function(expected) {
      expect(this.ctx.$scope.suggestions).not.to.include(expected);
    })
    .then('the options should be empty', function() {
      expect(this.ctx.$scope.options).to.be.empty;
    })
    .then('option $NUM should be focussed', function(index) {
      index = parseInt(index, 10);
      expect(this.ctx.$scope.focus).to.equal(index - 1);
    });
}(window.stepsLibrary));
