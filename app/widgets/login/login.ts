module Imber {
  import configureApp = Modules.configureAppWithTranslations;

  angular.module('imber.login', [
    'imber.dao',
    'imber.models',
    'imber.templates',
    'ngMaterial',
    'validation.match',
    'ngMessages',
    'pascalprecht.translate'
  ])
    .config(configureApp(LoginTranslations))
    .controller(LoginVMS)
    .directive(LoginDirectives);
}
