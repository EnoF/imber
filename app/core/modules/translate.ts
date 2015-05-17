module Modules {
  export function initializeTranslations(translations: Object) {
    function addTranslations($translateProvider) {
      angular.forEach(translations, (translation, language) => {
        $translateProvider.translations(language, translation);
      });
      $translateProvider
        .preferredLanguage('en')
        .fallbackLanguage('en');
    }
    addTranslations.$inject = ['$translateProvider'];
    return addTranslations;
  }
}
