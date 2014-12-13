(function autoCompleteVMScope(angular) {
  'use strict';

  describe('autoCompleteVM specs', function autoCompleteVMSpecs() {
    var testGlobals, $scope;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup) {
      testGlobals = testSetup.setupControllerTest('autoCompleteVM');
      $scope = testGlobals.$scope;
    }));

    it('should suggest options the moment the user starts typing', function suggestWhileTyping() {
      // given
      $scope.options = ['hello', 'hellow', 'helelel'];

      // when
      $scope.value = 'hell'
      $scope.suggest();

      // then
      expect($scope.suggestions).to.include('hello');
      expect($scope.suggestions).to.include('hellow');
      expect($scope.suggestions).not.to.include('helelel');
    });

    it('should be delayable when the server should be requested', function delayableRequest() {
      // given

      // when

      // then
    });

    it('should set a minimun threshold before the server should be requested', function minimunThreshold() {
      // given

      // when

      // then
    });
  });
}(window.angular));
