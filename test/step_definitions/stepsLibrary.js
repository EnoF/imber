(function stepsLibrary(window) {
  'use strict';

  var Yadda = require('yadda');
  var English = Yadda.localisation.English;
  var Dictionary = Yadda.Dictionary;

  var dictionary = new Dictionary().define('NUM', /(\d+)/);

  String.prototype.toCamelCase = function() {
    return this.toLowerCase().replace(/ (.)/g, function(match, firstLetter) {
      return firstLetter.toUpperCase();
    });
  };

  var stepLibrary = window.stepsLibrary = English.library(dictionary);

  stepLibrary.initializeVM = function initializeVM(vm, ctx, next) {
    initModule('imber');
    inject(function($rootScope, $controller, $httpBackend, userDAO, ipCookie) {
      ctx.$scope = $rootScope.$new();
      $controller(vm, {
        $scope: ctx.$scope
      });
      ctx.$httpBackend = $httpBackend;
      ctx.userDAO = userDAO;
      ctx.ipCookie = ipCookie;
      next();
    });
  };
}(window));
