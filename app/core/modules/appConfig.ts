module Modules {
  import MDThemingProvider = ng.material.MDThemingProvider;
  import RouteProvider = ng.route.IRouteProvider;

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

  function addRoutes(routes: Array<IRoute>, $routeProvider: RouteProvider) {
    routes.forEach((route: IRoute) => {
      $routeProvider.when(route.routeUrl, {
        templateUrl: route.templateUrl,
        controller: route.controller
      });
    });
    $routeProvider.otherwise(routes[0].routeUrl);
  }

  export function configureAppWithTranslations(translations: Object) {
    function configureApp($translateProvider, $mdThemingProvider) {
      configureTheme($mdThemingProvider);
      addTranslations(translations, $translateProvider);
    }
    configureApp.$inject = ['$translateProvider', '$mdThemingProvider'];
    return configureApp;
  }

  export interface IRoute {
    templateUrl: string;
    routeUrl: string;
    controller: string;
  }

  export function configureAppRoutes(routes: Array<IRoute>, translations: Object) {
    function configureApp($translateProvider, $mdThemingProvider, $routeProvider) {
      configureTheme($mdThemingProvider);
      addTranslations(translations, $translateProvider);
      addRoutes(routes, $routeProvider);
    }
    configureApp.$inject = ['$translateProvider', '$mdThemingProvider', '$routeProvider'];
    return configureApp;
  }
}
