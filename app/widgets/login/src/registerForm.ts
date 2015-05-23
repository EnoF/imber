module LoginDirectives {
  export function registerForm(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'LoginVM',
      templateUrl: 'registerForm'
    };
  }
}
