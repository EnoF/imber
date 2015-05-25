module ChallengesVMS {
  import BaseVM = Models.BaseVM;
  import Game = Models.Game;

  export class ChallengeVM extends BaseVM {
    static $inject = ['$scope'];

    challenge: Game;

    constructor($scope) {
      super($scope);

      this.challenge = $scope.challenge;
    }
  }
}
