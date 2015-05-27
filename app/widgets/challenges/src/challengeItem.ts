module ChallengesDirectives {
  import ChallengesVM = ChallengesVMS.ChallengesVM;

  export function challengeItem(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        challenge: '='
      },
      controller: 'ChallengeVM',
      templateUrl: 'challengeItem',
      require: '^challenges',
      link: ($scope: any, $attr, $element, challengesVM) => {
        $scope.vm.challengesVM = challengesVM;
      }
    };
  }
}
