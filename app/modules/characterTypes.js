(function characterTypesModuleScope(angular, clazz) {
  'use strict';

  var app = angular.module('imber');

  app.factory('characterTypes', function characterTypesScope() {
    return {
      SOLDIER: 0,
      KNIGHT: 1,
      MAGE: 2,
      ARCHER: 3,
      LANCER: 4,
      HERO: 5,
      SAGE: 6
    };
  });
}(window.angular, window.enofjs.clazz));
