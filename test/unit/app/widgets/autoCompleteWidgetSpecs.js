(function autoCompleteWidgetSpecsScope(angular, sinon) {
  'use strict';

  describe('<auto-complete> specs', function autoCompleteWidgetSpecs() {
    var testGlobals, parentScope, $q, defaultOptions;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _$q_) {
      testGlobals = testSetup.setupDirectiveTest();
      parentScope = testGlobals.parentScope;
      $q = _$q_;
      defaultOptions = ['options1', 'options2'];
    }));

    function loadDefaultOptions(value) {
      var deferred = $q.defer();
      deferred.resolve(['option1', 'option2']);
      return deferred.promise;
    }

    it('should instantiate with the provided options', function providedOptions() {
      // given
      parentScope.options = defaultOptions;
    });

    it('should dynamically load the options from the server', function dynamicLoading() {
      // given
      parentScope.load = loadDefaultOptions;
      var directive = angular.element('<auto-complete load="load"></auto-complete>');
      var $scope = testGlobals.initializeDirective(parentScope, directive);
      $scope.value = 'banana';

      // when
      $scope.load();
      $scope.$apply();

      // then
      expect($scope.options).to.include('option1');
      expect($scope.options).to.include('option2');
    });
  });
}(window.angular, window.sinon));
