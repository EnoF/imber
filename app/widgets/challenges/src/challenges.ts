module ChallengesDirectives {
  export function challenges(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        playerId: '@'
      },
      controller: 'ChallengesVM',
      templateUrl: 'challenges'
    };
  }
}
