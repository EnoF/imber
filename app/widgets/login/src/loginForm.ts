module LoginDirectives {
  export function loginForm(): ng.IDirective {
    return {
      restrict: 'EA',
      templateUrl: 'loginForm'
    };
  }
}
