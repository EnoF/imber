module Imber {
  import initializeTranslation = Modules.initializeTranslations;

  angular.module('imber.login', [
    'imber.dao',
    'imber.models',
    'imber.templates',
    'ngMaterial',
    'pascalprecht.translate'
  ])
    .config(initializeTranslation(LoginTranslations))
    .controller(LoginVMS)
    .directive(LoginDirectives);
}
