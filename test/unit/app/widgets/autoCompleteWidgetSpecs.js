(function autoCompleteWidgetSpecsScope(angular, sinon) {
  'use strict';

  describe('<auto-complete> specs', function autoCompleteWidgetSpecs() {
    var testGlobals, parentScope, $q, defaultOptions, $timeout;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _$q_, _$timeout_) {
      testGlobals = testSetup.setupDirectiveTest();
      parentScope = testGlobals.parentScope;
      $q = _$q_;
      $timeout = _$timeout_;
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
      var directive = angular.element('<auto-complete options="options"></auto-complete>');

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);

      // then
      expect($scope.options).to.equal(defaultOptions);
    });

    it('should instantiate with the provided value', function providedValue() {
      // given
      parentScope.value = 'banana';
      var directive = angular.element('<auto-complete value="value"></auto-complete>');

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);

      // then
      expect($scope.value).to.equal('banana');
    });

    it('should dynamically load the options from the server', function dynamicLoading() {
      // given
      parentScope.load = loadDefaultOptions;
      var directive = angular.element('<auto-complete load="load"></auto-complete>');
      var $scope = testGlobals.initializeDirective(parentScope, directive);
      $scope.value = 'banana';

      // when
      $scope.load();
      $timeout.flush();

      // then
      expect($scope.options).to.include('option1');
      expect($scope.options).to.include('option2');
    });

    it('should configure the delay', function configureDelay() {
      // given
      parentScope.parentDelay = 5000;
      var directive = angular.element('<auto-complete delay="parentDelay"></auto-complete>');

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);

      // then
      expect($scope.delay).to.equal(5000);
    });

    it('should configure the minSearch', function configureMinSearch() {
      // given
      parentScope.parentMinSearch = 2;
      var directive = angular.element('<auto-complete min-search="parentMinSearch"></auto-complete>');

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);

      // then
      expect($scope.minSearch).to.equal(2);
    });

    it('should select and call back the registered function', function selectAndCallback() {
      // given
      parentScope.selectCallback = sinon.spy();
      parentScope.parentOptions = defaultOptions;
      var directive = angular
        .element('<auto-complete options="parentOptions" on-select="selectCallback"></auto-complete>"');
      var $scope = testGlobals.initializeDirective(parentScope, directive);

      // when
      $scope.select(defaultOptions[0]);

      // then
      expect(parentScope.selectCallback).to.have.been.calledWith(defaultOptions[0]);
    });
  });
}(window.angular, window.sinon));
