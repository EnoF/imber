module Imber {
  import configureApp = Modules.configureAppRoutes;
  import IRoute = Modules.IRoute;

  var routes: Array<IRoute> = [{
    templateUrl: 'pages/login',
    routeUrl: '/login',
    controller: 'ImberVM'
  }];

  angular.module('imber.imber', [
    'imber.login',
    'imber.challenges',
    'imber.templates',
    'ngRoute',
    'ngMaterial',
    'pascalprecht.translate'
  ])
    .config(configureApp(routes, ImberTranslations))
    .controller(ImberVMS)
    .directive(ImberDirectives);
}
