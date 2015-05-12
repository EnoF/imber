module LoginDirectives {
  export function loginForm(): ng.IDirective {
    return {
      restrict: 'EA',
      controller: 'LoginVM',
      scope: {},
      templateUrl: 'loginForm'
    };
  }
}
