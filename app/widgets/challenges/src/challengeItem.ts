module ChallengesDirectives {
  export function challengeItem(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        challenge: '='
      },
      controller: 'ChallengeVM',
      templateUrl: 'challengeItem'
    };
  }
}
