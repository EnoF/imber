(function autoCompleteVMScope(angular, sinon) {
  'use strict';

  describe('autoCompleteVM specs', function autoCompleteVMSpecs() {
    var testGlobals, $scope, defaultOptions, $q, $timeout;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _$q_, _$timeout_) {
      testGlobals = testSetup.setupControllerTest('autoCompleteVM');
      $scope = testGlobals.$scope;
      defaultOptions = ['hello', 'hellow', 'helelel'];
      $q = _$q_;
      $timeout = _$timeout_;
    }));

    it('should suggest options the moment the user starts typing', function suggestWhileTyping() {
      // given
      $scope.options = defaultOptions;

      // when
      $scope.value = 'hell'
      $scope.suggest();

      // then
      expect($scope.suggestions).to.include('hello');
      expect($scope.suggestions).to.include('hellow');
      expect($scope.suggestions).not.to.include('helelel');
    });

    it('should be not execute the request directly', delayedExecution);

    function delayedExecution() {
      // given
      $scope.value = $scope.value || 'he';
      $scope.delay = 3000;
      var deferred = $q.defer();
      $scope.loadFunction = function loadFunction() {
        deferred.resolve(defaultOptions);
        return deferred.promise;
      };

      // when
      $scope.load();
      $scope.$apply();

      // then
      expect($scope.options).to.be.empty;
    }

    it('should execute a delayed request', function shouldExecuteDelayedRequest() {
      // given
      delayedExecution();

      // when
      $timeout.flush();

      // then
      expect($scope.options).to.include('hello');
      expect($scope.options).to.include('hellow');
      expect($scope.options).to.include('helelel');
    });

    it('should prevent the request to be executed when the min threshold has not been met', function minimunThreshold() {
      // given
      $scope.minSearch = 3;
      $scope.value = 'he';

      // when
      delayedExecution();
      $timeout.flush();

      // then
      expect($scope.options).to.be.empty;
    });
  });
}(window.angular, window.sinon));
