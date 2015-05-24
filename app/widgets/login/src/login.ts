module LoginDirectives {
  export function login(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'LoginVM',
      templateUrl: 'login'
    };
  }
}
