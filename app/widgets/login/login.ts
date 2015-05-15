module Imber {
  angular.module('imber.login', [
    'imber.dao',
    'imber.models',
    'imber.templates'
    ])
    .controller(LoginVMS)
    .directive(LoginDirectives);
}
