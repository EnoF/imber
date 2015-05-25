module Imber {
  import configureApp = Modules.configureAppWithTranslations;

  angular.module('imber.challenges', [
    'imber.dao',
    'imber.models',
    'imber.templates',
    'ngMaterial',
    'validation.match',
    'ngMessages',
    'pascalprecht.translate'
  ])
    .config(configureApp(ChallengesTranslations))
    .controller(ChallengesVMS)
    .directive(ChallengesDirectives);
}
