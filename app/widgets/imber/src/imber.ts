module ImberDirectives {
  export function imber(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'ImberVM',
      templateUrl: 'imber'
    };
  }
}
