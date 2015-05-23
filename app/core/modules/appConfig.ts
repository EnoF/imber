module Modules {
  import MDThemingProvider = ng.material.MDThemingProvider;

  function configureTheme($mdThemingProvider: MDThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .dark();
  }

  function addTranslations(translations, $translateProvider) {
    angular.forEach(translations, (translation, language) => {
      $translateProvider.translations(language, translation);
    });
    $translateProvider
      .preferredLanguage('en')
      .fallbackLanguage('en');
  }

  export function configureAppWithTranslations(translations: Object) {
    function configureApp($translateProvider, $mdThemingProvider) {
      configureTheme($mdThemingProvider);
      addTranslations(translations, $translateProvider);
    }
    configureApp.$inject = ['$translateProvider', '$mdThemingProvider'];
    return configureApp;
  }
}
